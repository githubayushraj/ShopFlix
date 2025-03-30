import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const WomensCloth = () => {
  const [products, setProducts] = useState([]);
  // Use 1-based page indexing for the UI
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredReview, setHoveredReview] = useState(null);

  const PRODUCTS_PER_PAGE = 20;
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  /** Function to fetch products **/
  const fetchProducts = async (page) => {
    console.log("Fetching products for page:", page);
    setLoading(true);
    setError(null);
    try {
      // Convert the UI page (1-indexed) to a backend page (0-indexed)
      const response = await axios.get(
        `http://localhost:8080/shopflix/womenscloth?page=${page - 1}&size=${PRODUCTS_PER_PAGE}`
      );
      console.log("Response:", response.data);
      const { content, totalPages: tp, totalElements } = response.data;
      setProducts(content || []);
      setCurrentPage(page);
      setTotalPages(tp !== undefined ? tp : Math.ceil(totalElements / PRODUCTS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** Function to add product to cart **/
  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    if (!userId || !token) {
      toast.error("Please login to add products to Cart");
      return;
    }
    try {
      await axios.post("http://localhost:8080/user_items/add", null, {
        params: {
          user_id: userId,
          item_id: product.id,
          category: "CART",
          section: "fashion",
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  /** Fetch products on component mount (page 1) **/
  useEffect(() => {
    fetchProducts(1);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }
  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Dynamically generate page buttons (up to 5 buttons)
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(i);
  }

  return (
    <div className="p-6">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow-lg relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded-lg"
                />
              </motion.div>
              <div className="mt-4 text-center">
                <h2 className="text-sm font-bold text-gray-800 truncate">{product.name}</h2>
                <p className="text-xs text-gray-500">{product.sub_category}</p>
                {/* Price and Discount */}
                <div className="flex justify-center items-center mt-2 space-x-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-lg font-semibold text-indigo-600">₹{product.discountPrice}</span>
                      {product.actualPrice > product.discountPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.actualPrice}</span>
                      )}
                    </>
                  ) : (
                    <span className="text-lg font-semibold text-gray-600">Price Not Available</span>
                  )}
                </div>
                {/* Ratings with Hover Review Tooltip */}
                <div
                  className="mt-2 text-sm text-gray-600 relative cursor-pointer"
                  onMouseEnter={() => setHoveredReview(product.id)}
                  onMouseLeave={() => setHoveredReview(null)}
                >
                  ⭐ {product.ratings} ({product.no_of_ratings} Reviews)
                  {hoveredReview === product.id && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-800 text-white text-xs p-2 rounded-lg shadow-lg z-10">
                      <p>{product.review || "No detailed review available."}</p>
                    </div>
                  )}
                </div>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-indigo-600 hover:underline"
                >
                  View Product →
                </a>
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-green-500"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
          disabled={currentPage === 1}
          onClick={() => fetchProducts(currentPage - 1)}
        >
          Previous
        </button>

        {/* Page Number Buttons */}
        {pageButtons.map((pageNum) => (
          <button
            key={pageNum}
            className={`px-3 py-2 text-sm font-semibold rounded-lg ${
              currentPage === pageNum
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => fetchProducts(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => fetchProducts(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WomensCloth;
