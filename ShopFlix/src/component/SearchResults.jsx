import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

// Helper to format a number as a price with two decimals.
const formatPrice = (price) => {
  if (price === undefined || price === null) return "N/A";
  return Number(price).toFixed(2);
};

// Helper to calculate discount percentage
const calculateDiscount = (actualPrice, discountPrice) => {
  if (!discountPrice || !actualPrice || discountPrice <= 0 || actualPrice <= 0) return null;
  // Assuming discountPrice is the original price and actualPrice is the discounted price.
  return Math.round(((discountPrice - actualPrice) / discountPrice) * 100);
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  
  // State for search results, pagination, loading & error states.
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const size = 12; // Number of items per page
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for view type and sort option.
  const [viewType, setViewType] = useState("grid"); // "grid" or "list"
  const [sortBy, setSortBy] = useState("relevance"); // "relevance", "price-asc", "price-desc", "rating"
  
  // IntersectionObserver to trigger fetching the next page when the last element is visible.
  const observer = useRef();
  const lastResultElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  // Reset results when query or sort changes.
  useEffect(() => {
    setResults([]);
    setPage(0);
    setHasMore(true);
  }, [query, sortBy]);
  
  // Fetch results when query, page, or sort changes.
  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}&sort=${sortBy}`, { signal })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`HTTP ${res.status}: ${text}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Fetched Data:", data); // Log the fetched data

            // Add a URL property to each result if it doesn't already have one
            const enhancedData = data.map(item => ({
                ...item,
                url: item.link || `/product/${item.id || Math.random().toString(36).substring(2, 15)}`
            }));

            setResults(prev => page === 0 ? enhancedData : [...prev, ...enhancedData]);
            setHasMore(data.length === size);
            setLoading(false);
        })
        .catch((err) => {
            if (err.name !== "AbortError") {
                console.error("Search Error:", err);
                setError(err.message);
                setLoading(false);
            }
        });

    return () => controller.abort(); // Cleanup function to abort request on dependency change
  }, [query, page, sortBy]);

  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Handle product click
  const handleProductClick = (url, e) => {
    // If the click was on the "Add to Cart" button, don't navigate
    if (e.target.closest('.add-to-cart-btn')) {
      e.preventDefault();
      return;
    }
    window.open(url, '_blank');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header with search summary and controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {query ? `Results for "${query}"` : "All Products"}
          </h2>
          {results.length > 0 && (
            <p className="text-gray-600 mt-1">
              Showing {results.length} {results.length === 1 ? "result" : "results"}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          {/* View type toggle */}
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
            <button 
              onClick={() => setViewType("grid")}
              className={`px-4 py-2 rounded-l-lg ${viewType === "grid" ? "bg-indigo-50 text-indigo-600" : "text-gray-600"}`}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setViewType("list")}
              className={`px-4 py-2 rounded-r-lg ${viewType === "list" ? "bg-indigo-50 text-indigo-600" : "text-gray-600"}`}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Sort results by"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Empty state */}
      {results.length === 0 && !loading && !error && (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">No results found</h3>
          <p className="mt-2 text-gray-600">
            We couldn't find any matches for "{query}". Try checking your spelling or using more general terms.
          </p>
        </div>
      )}
      
      {/* Grid view */}
      {viewType === "grid" && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item, index) => {
            const discountPercentage = calculateDiscount(item.actualPrice, item.discountPrice);
            const reviewCount = item.no_of_ratings || 0;
            
            const itemContent = (
              <div 
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col cursor-pointer group"
                onClick={(e) => handleProductClick(item.url, e)}
              >
                {/* Product image with discount badge */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image || "/images/placeholder-product.jpg"} 
                    alt={item.productName || "Product"} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder-product.jpg"; }}
                  />
                  {discountPercentage && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      {discountPercentage}% OFF
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-full shadow-lg">View Details</span>
                  </div>
                </div>
                
                {/* Product details */}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">{item.productName || "Untitled Product"}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description || "No description available"}</p>
                  
                  {/* Ratings */}
                  <div className="flex items-center mt-auto mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.round(item.ratings) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {reviewCount > 0 && (
                      <span className="text-gray-500 text-xs ml-2">
                        ({reviewCount.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-indigo-600">
                    ₹{formatPrice(item.actualPrice)}
                    </p>
                    {item.actualPrice > 0 && (
                      <p className="text-gray-500 line-through text-sm">
                        ₹{formatPrice(item.discountPrice)}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Add to cart button */}
                <div className="flex space-x-2 p-2">
                  <button className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg flex-1 hover:bg-indigo-700 transition-colors duration-300 add-to-cart-btn">
                    Add to Cart
                  </button>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-indigo-100 text-indigo-600 font-medium py-2 px-3 rounded-lg hover:bg-indigo-200 transition-colors duration-300 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            );
            
            if (results.length === index + 1) {
              return (
                <div key={item.id || index} ref={lastResultElementRef}>
                  {itemContent}
                </div>
              );
            } else {
              return <div key={item.id || index}>{itemContent}</div>;
            }
          })}
        </div>
      )}
      
      {/* List view */}
      {viewType === "list" && results.length > 0 && (
        <div className="space-y-4">
          {results.map((item, index) => {
            const discountPercentage = calculateDiscount(item.discountPrice, item.actualPrice);
            const reviewCount = item.no_of_ratings || 0;
            
            const itemContent = (
              <div 
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md flex flex-col md:flex-row cursor-pointer group"
                onClick={(e) => handleProductClick(item.url, e)}
              >
                {/* Product image with discount badge */}
                <div className="relative md:w-1/4 overflow-hidden">
                  <img 
                    src={item.image || "/images/placeholder-product.jpg"} 
                    alt={item.productName || "Product"} 
                    className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder-product.jpg"; }}
                  />
                  {discountPercentage && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      {discountPercentage}% OFF
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-full shadow-lg">View Details</span>
                  </div>
                </div>
                
                {/* Product details */}
                <div className="p-4 md:p-6 flex-grow flex flex-col md:w-3/4">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-300">{item.productName || "Untitled Product"}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.round(item.ratings) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        {reviewCount > 0 && (
                          <span className="text-gray-500 text-xs ml-2">
                            ({reviewCount.toLocaleString()} reviews)
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:text-right mt-2 md:mt-0">
                      <div className="flex items-center md:justify-end space-x-2">
                        <p className="text-2xl font-bold text-indigo-600">
                        ₹{formatPrice(item.discountPrice)}
                        </p>
                        {item.actualPrice > 0 && (
                          <p className="text-gray-500 line-through text-sm">
                            ₹{formatPrice(item.actualPrice)}
                          </p>
                        )}
                      </div>
                      {discountPercentage && (
                        <p className="text-red-500 text-sm font-medium">
                          Save {discountPercentage}%
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 my-3">{item.description || "No description available"}</p>
                  
                  <div className="mt-auto flex justify-end items-center space-x-3">
                    <a 
                      href={item.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Website
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {/* <button onClick={(e)=> handleAddToCart(e)} className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 add-to-cart-btn">
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            );
            
            if (results.length === index + 1) {
              return (
                <div key={item.id || index} ref={lastResultElementRef}>
                  {itemContent}
                </div>
              );
            } else {
              return <div key={item.id || index}>{itemContent}</div>;
            }
          })}
        </div>
      )}
      
      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="text-gray-600 mt-2">Loading more products...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Error loading results: {error}
          </p>
          <button 
            onClick={() => setPage(prev => prev)} 
            className="mt-2 text-red-700 underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}
      
      {/* End of results */}
      {!hasMore && results.length > 0 && !loading && (
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-gray-600">You've reached the end of the results.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;