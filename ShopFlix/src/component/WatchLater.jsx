import React, { useEffect, useState } from 'react';
import { Film, Clock, Plus, Heart, Share2, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Fetch watch later movies from the backend
  useEffect(() => {
    axios.get(`http://localhost:8080/user_items/watchlater/items/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log("API response data:", response.data);
        // Use response.data.movies since the API returns { movies: [...] }
        const movies = Array.isArray(response.data.movies)
          ? response.data.movies
          : [];
        setWatchLaterMovies(movies);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching watch later movies:", error);
        toast.error("Failed to load your Watch Later list.");
        setIsLoading(false);
      });
  }, [userId, token]);

  // Remove a movie from the watch later list
  const handleRemoveFromWatchLater = (movieId) => {
    setWatchLaterMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
    toast.success("Movie removed from Watch Later.");
  };

  // Add to cart handler (example)
  const handleAddToCart = (movie) => {
    console.log(`Added ${movie.seriesTitle} to cart`);
    alert(`Added "${movie.seriesTitle}" to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Watch Later</h1>
              <p className="text-xl opacity-90">Save now, enjoy later</p>
            </div>
            <div className="relative">
              {/* Watch Later icon */}
              <Clock size={36} className="mr-2" />
              {/* Badge */}
              {watchLaterMovies.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                  {watchLaterMovies.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : watchLaterMovies.length === 0 ? (
          <div className="text-center py-16">
            <Film size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your watch later list is empty</h2>
            <p className="text-gray-500 mb-6">Discover great movies and save them for later</p>
            <button 
              onClick={() => navigate("/movies")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchLaterMovies.map(movie => (
              <div 
                key={movie.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={movie.posterLink} 
                    alt={movie.seriesTitle} 
                    className="w-full h-64 object-cover transition-transform duration-300 ease-in-out"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-sm">
                    {movie.imdbRating}/10
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1">{movie.seriesTitle}</h3>
                  <p className="text-gray-600 mb-2">{movie.director} • {movie.releasedYear}</p>
                  <div className="flex items-center mb-4">
                    <Clock size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-500 text-sm">{movie.runtime}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500 text-sm">{movie.genre}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAddToCart(movie)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition flex items-center justify-center"
                    >
                      <Plus size={16} className="mr-1" /> Watch Now
                    </button>
                    <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition">
                      <Heart size={18} className="text-red-500" />
                    </button>
                    <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition">
                      <Share2 size={18} className="text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleRemoveFromWatchLater(movie.id)}
                      className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <Trash2 size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLater;
