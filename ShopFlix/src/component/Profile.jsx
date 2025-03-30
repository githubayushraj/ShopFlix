import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Clock, Edit, Camera, X } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  // Fetch the profile details from the backend
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/user/${userEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart, watchlist and review counts
  const fetchCounts = async () => {
    if (!userId) return;
    try {
      // Fetch cart items count
      const cartResponse = await axios.get(`http://localhost:8080/user_items/cart/items/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let cartTotal = 0;
      Object.values(cartResponse.data).forEach((group) => {
        if (Array.isArray(group)) {
          cartTotal += group.length;
        }
      });
      setCartCount(cartTotal);

      // Fetch watchlist items count
      const watchlistResponse = await axios.get(`http://localhost:8080/user_items/watchlater/items/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let watchlistTotal = 0;
      Object.values(watchlistResponse.data).forEach((group) => {
        if (Array.isArray(group)) {
          watchlistTotal += group.length;
        }
      });
      setWatchlistCount(watchlistTotal);

      // Fetch reviews count (assuming it returns an array)
      const reviewsResponse = await axios.get(`http://localhost:8080/api/reviews/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reviewsData = reviewsResponse.data;
      setReviewCount(Array.isArray(reviewsData) ? reviewsData.length : 0);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCounts();

    // Close profile if clicked outside the box
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // run on mount

  // When profile is closed (isOpen becomes false), navigate back to the shop page
  useEffect(() => {
    if (!isOpen) {
      navigate("/shop");
    }
  }, [isOpen, navigate]);

  // Generate a background gradient based on the user's name
  const generateGradient = (name) => {
    if (!name) return 'bg-gradient-to-r from-blue-400 to-purple-500';
    const sumChars = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorCombinations = [
      'bg-gradient-to-r from-blue-400 to-purple-500',
      'bg-gradient-to-r from-green-400 to-teal-500',
      'bg-gradient-to-r from-red-400 to-pink-500',
      'bg-gradient-to-r from-yellow-400 to-orange-500',
      'bg-gradient-to-r from-indigo-400 to-blue-500',
    ];
    return colorCombinations[sumChars % colorCombinations.length];
  };

  // Get initials from the name for a fallback avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Close profile manually using the close buttons
  const handleClose = () => {
    navigate("/shop");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Profile not found</p>
        <button onClick={fetchProfile}>Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6" ref={profileRef}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative">
        {/* Close Button at Top Right */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 p-1 rounded-full hover:bg-opacity-100 transition-all duration-200"
        >
          <X size={24} className="text-gray-700" />
        </button>
        
        {/* Cover Photo with Animated ShopFlix Text */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-5xl font-extrabold relative z-10 shopflix-animated">
              Shop<span className="text-yellow-300">Flix</span>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-6 h-6 rounded-full bg-white opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${2 + Math.random() * 3}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-20px) scale(1.1); }
            }
            .shopflix-animated {
              animation: textglow 2s infinite alternate;
              text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
            }
            @keyframes textglow {
              from { text-shadow: 0 0 5px rgba(255, 255, 255, 0.7); }
              to { text-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(78, 204, 255, 0.8); }
            }
          `}</style>
        </div>
        
        {/* Profile Header */}
        <div className="relative px-6">
          <div className="flex flex-col sm:flex-row items-center">
            {/* Profile Picture */}
            <div className="absolute -top-16 flex items-center justify-center">
              {profile.profileImageUrl ? (
                <img 
                  src={profile.profileImageUrl} 
                  alt={profile.name} 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className={`w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-white ${generateGradient(profile.name)}`}>
                  {getInitials(profile.name)}
                </div>
              )}
              <button className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <Camera size={16} />
              </button>
            </div>
            {/* Name and Email Section */}
            <div className="mt-20 sm:mt-4 sm:ml-36 text-center sm:text-left w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600 flex items-center justify-center sm:justify-start mt-1">
                    <Mail size={16} className="mr-2" /> {profile.email}
                  </p>
                </div>
                <button className="mt-4 sm:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  <Edit size={16} className="mr-2" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-8 px-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <a href="#" className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600 whitespace-nowrap">
                Personal Info
              </a>
              <a href="/shop/{userId}/cart" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap ml-8">
                Add to Cart
              </a>
              <a href="/watchlist" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap ml-8">
                Watchlist
              </a>
            </nav>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{profile.phoneNo || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-gray-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{profile.gender || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">{new Date(profile.createdAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{new Date(profile.updatedAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-1">Add to Cart</h4>
              <p className="text-2xl font-bold text-blue-900">{cartCount}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
              <h4 className="font-medium text-purple-800 mb-1">Watchlist</h4>
              <p className="text-2xl font-bold text-purple-900">{watchlistCount}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
              <h4 className="font-medium text-green-800 mb-1">Reviews</h4>
              <p className="text-2xl font-bold text-green-900">{reviewCount}</p>
            </div>
          </div>
          
          {/* Close Button at Bottom */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-200 flex items-center"
            >
              <X size={16} className="mr-2" /> Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
