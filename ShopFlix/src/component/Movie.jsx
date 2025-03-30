import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  // Use 1-based page indexing for the UI
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  const MOVIES_PER_PAGE = 21;

  /** Function to fetch movies **/
  const fetchMovies = async (page) => {
    console.log("Fetching movies for page:", page);
    setLoading(true);
    setError(null);
    try {
      // Convert the UI page (1-indexed) to backend page (0-indexed)
      const response = await axios.get(
        `http://localhost:8080/shopflix/movies?page=${page - 1}&size=${MOVIES_PER_PAGE}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response:", response.data);
      const { content, totalPages: tp, totalElements } = response.data;
      setMovies(content || []);
      setCurrentPage(page);
      setTotalPages(tp !== undefined ? tp : Math.ceil(totalElements / MOVIES_PER_PAGE));
      console.log("Updated currentPage:", page, "totalPages:", tp !== undefined ? tp : Math.ceil(totalElements / MOVIES_PER_PAGE));
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** Fetch movies on component mount (page 1) **/
  useEffect(() => {
    fetchMovies(1);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading movies...</p>;
  }
  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Dynamically generate page buttons based on currentPage and totalPages
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

  // Add a movie to "Watch Later"
  const handleWatchLater = async (movie, e) => {
    e.stopPropagation();
    if (!userId) {
      toast.error("Please login to add movies to Watch Later");
      return;
    }
    try {
      await axios.post("http://localhost:8080/user_items/add", null, {
        params: {
          user_id: userId,
          item_id: movie.id,
          category: "WATCHLATER",
          section: "movies",
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Movie added to Watch Later!");
    } catch (error) {
      toast.error("Please login to add movies to Watch Later");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-screen-2xl mx-auto relative">
      {/* Movies Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer overflow-hidden group rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={() => setSelectedMovie(movie)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center"
            >
              <img
                src={movie.posterLink}
                alt={movie.seriesTitle}
                className="w-full h-full object-contain rounded-xl"
              />
              <div className="absolute top-0 right-0 text-xs px-2 py-1 m-1 text-yellow-500 font-bold bg-black bg-opacity-70 rounded-md">
                ⭐ {movie.imdbRating}
              </div>
            </motion.div>
            <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-black bg-opacity-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success(`Watch Now: ${movie.seriesTitle}`);
                }}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
              >
                Watch Now
              </button>
              <button
                onClick={(e) => handleWatchLater(movie, e)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
              >
                Watch Later
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Movie Details */}
      {selectedMovie && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="relative w-full max-w-5xl mx-4 p-6 bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold"
              onClick={() => setSelectedMovie(null)}
            >
              ✖
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={selectedMovie.posterLink}
                  alt={selectedMovie.seriesTitle}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold mb-4">{selectedMovie.seriesTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-sm md:text-base">
                    <strong>Genre:</strong> {selectedMovie.genre.replace(/"/g, "")}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong>Director:</strong> {selectedMovie.director}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong>IMDb Rating:</strong> ⭐ {selectedMovie.imdbRating}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong>Released Year:</strong> {selectedMovie.releasedYear}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong>Runtime:</strong> {selectedMovie.runtime}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong>Certificate:</strong> {selectedMovie.certificate}
                  </p>
                </div>
                <p className="mt-4 text-gray-300 text-sm md:text-base">
                  {selectedMovie.overview}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-105 hover:bg-blue-700"
                onClick={() => setSelectedMovie(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
          disabled={currentPage === 1}
          onClick={() => fetchMovies(currentPage - 1)}
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
            onClick={() => fetchMovies(pageNum)}
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
          onClick={() => fetchMovies(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
