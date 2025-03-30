import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import ProductCard from './ProductCard';

const CategorySection = ({ category, title, subCategories = [] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(''); // state to track selected subcategory
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build query parameters; add subcategory if selected.
        const params = { page: 0, size: 20 };
        if (selectedSub) {
          params.sub = selectedSub;
        }
        // Fetch data from your endpoint (adjust as needed)
        const response = await axios.get(`http://localhost:8080/shopflix/${category}`, { params });
        // Adjust based on your API response structure:
        setProducts(response.data.content || response.data);
      } catch (error) {
        console.error(`Error fetching data for ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, selectedSub]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
      setScrollPosition(container.scrollLeft);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const showLeftButton = scrollPosition > 0;
  const showRightButton =
    scrollContainerRef.current &&
    scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10;

  return (
    <div className="mb-8">
      {/* Header with title and "See more" link */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <ChevronRight size={20} className="text-blue-600 ml-2" />
        </div>
        <a
          href={`/category/${category}`}
          className="text-sm text-blue-600 hover:underline hover:text-blue-800"
        >
          See more
        </a>
      </div>

      {/* Subcategory navigation */}
      {subCategories.length > 0 && (
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-3 py-1 rounded-full ${selectedSub === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setSelectedSub('')}
          >
            All
          </button>
          {subCategories.map((sub, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-full ${selectedSub === sub ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setSelectedSub(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product carousel with scroll buttons */}
      <div className="relative">
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-w-[12rem] p-3 animate-pulse">
                  <div className="h-40 bg-gray-200 mb-2"></div>
                  <div className="h-4 bg-gray-200 mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 mb-2 w-1/2"></div>
                  <div className="h-6 bg-gray-200 w-1/3"></div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
