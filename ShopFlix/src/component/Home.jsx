import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, Play, Star, ArrowRight, Menu, X, Mail, Phone, 
  Instagram, Twitter, Facebook, Youtube, ArrowUp, Gift, Clock, CreditCard, Shield 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Helper function to generate random positions for floating elements
const randomPosition = () => {
  return {
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`,
  };
};

// Sample data
const movieData = [
  { id: 1, title: "Cosmic Adventure", rating: 4.8, image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg", genre: "Sci-Fi" },
  { id: 2, title: "Midnight Chase", rating: 4.5, image: "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg", genre: "Action" },
  { id: 3, title: "Dream Weaver", rating: 4.7, image: "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_.jpg", genre: "Fantasy" },
  { id: 4, title: "Urban Legends", rating: 4.3, image: "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg", genre: "Thriller" }
];

const productData = [
  { id: 1, title: "Premium Headphones", price: 298, image: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_145007246?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402/300x300/000/fff", category: "Electronics" },
  { id: 2, title: "Designer Boots", price: 129.95, image: "https://m.media-amazon.com/images/I/51vKQnvtroL._SY695_.jpg", category: "Fashion" },
  { id: 3, title: "Smart Watch", price: 249.99, image: "https://m.media-amazon.com/images/I/31Cud2WnszL._SX300_SY300_QL70_FMwebp_.jpg", category: "Electronics" },
  { id: 4, title: "Vintage Camera", price: 89.99, image: "https://m.media-amazon.com/images/I/71C6TFutbeL._AC_SL1500_.jpg", category: "Photography" }
];

// Floating images for animation
const floatingElements = [
  { type: 'movie', image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg/150/225" },
  { type: 'product', image: "https://m.media-amazon.com/images/I/614TSm1LckL.jpg" },
  { type: 'movie', image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg/150/225" },
  { type: 'product', image: "https://m.media-amazon.com/images/I/5113ABUyZqL._SY300_SX300_QL70_FMwebp_.jpg.jpg" },
  { type: 'movie', image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg/150/225" },
  { type: 'product', image: "https://m.media-amazon.com/images/I/71P85R392uL._SL1500_.jpg" }
];

// Features for the features section
const features = [
  { icon: <Gift className="w-10 h-10 text-red-500" />, title: "Exclusive Offers", description: "Members receive special deals and early access to limited items" },
  { icon: <Clock className="w-10 h-10 text-indigo-500" />, title: "24/7 Streaming", description: "Watch your favorite content anytime, anywhere with unlimited access" },
  { icon: <CreditCard className="w-10 h-10 text-blue-500" />, title: "Easy Payments", description: "Multiple secure payment options for hassle-free transactions" },
  { icon: <Shield className="w-10 h-10 text-green-500" />, title: "Secure Platform", description: "Your data and transactions are protected with top-tier security" }
];

const Home = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingItems, setFloatingItems] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    // Generate random positions for floating elements
    const items = floatingElements.map((item, index) => ({
      ...item,
      id: index,
      ...randomPosition()
    }));
    setFloatingItems(items);
    
    // Reposition items every 20 seconds
    const intervalId = setInterval(() => {
      setFloatingItems(prev => 
        prev.map(item => ({
          ...item,
          ...randomPosition()
        }))
      );
    }, 20000);
    
    // Show scroll to top button when scrolled down
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gray-900/90 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">
          ShopFlix
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="hover:text-indigo-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-indigo-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/movies" className="hover:text-indigo-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-indigo-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-500 after:transition-all">
              Account
            </Link>
          </li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/95 pt-20 px-6 md:hidden">
          <ul className="flex flex-col space-y-6 text-xl">
            <li><Link to="/" className="block py-2">Home</Link></li>
            <li><Link to="/shop" className="block py-2">Shop</Link></li>
            <li><Link to="/movies" className="block py-2">Movies</Link></li>
            <li><Link to="/profile" className="block py-2">Account</Link></li>
          </ul>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 py-24">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingItems.map((item) => (
            <div
              key={item.id}
              className="absolute rounded-lg shadow-lg opacity-40 hover:opacity-70 transition-opacity"
              style={{
                top: item.top,
                left: item.left,
                animationDelay: item.animationDelay,
                width: item.type === 'movie' ? '150px' : '120px',
                height: item.type === 'movie' ? '225px' : '120px',
                animation: `float ${item.animationDuration} infinite ease-in-out`,
              }}
            >
              <img 
                src={item.image} 
                alt="" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-xl mx-auto md:mx-0 md:ml-12 lg:ml-24 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            One Place for <span className="bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">Shopping & Entertainment</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover the perfect blend of online shopping and streaming entertainment. 
            Shop for your favorite products while enjoying the latest movies and shows.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button onClick={() => navigate('/shop')} className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-indigo-500 text-white font-medium flex items-center gap-2 transform hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-indigo-500/30">
              <ShoppingBag size={18} />
              Shop Now
            </button>
            <button onClick={() => navigate('/movies')} className="px-6 py-3 rounded-full bg-transparent border-2 border-indigo-500 text-white font-medium flex items-center gap-2 transform hover:-translate-y-1 transition-all">
              <Play size={18} />
              Watch Movies
            </button>
          </div>
        </div>
      </section>
      
      {/* Shop Section */}
      <section id="shop" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">Shop</span> Our Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productData.map(product => (
              <div 
                key={product.id} 
                className="bg-gray-800/50 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-indigo-400 mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <div className="text-2xl font-bold text-red-500 mb-4">
                    ${product.price}
                  </div>
                  <button onClick={() => navigate('/login')} className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium">
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Movies Section */}
      <section id="movies" className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">Stream</span> Top Movies
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movieData.map(movie => (
              <div 
                key={movie.id} 
                className="bg-gray-800/50 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-2"
              >
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div onClick={()=> navigate("/login")} className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                    <button className="mb-6 px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Play size={16} />
                      Watch Now
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-indigo-400 mb-2">
                    {movie.genre}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} className="text-gray-500" />
                    </div>
                    <span className="ml-2 text-sm">{movie.rating}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/movies" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium">
              View All Movies
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">Why Choose</span> ShopFlix
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-gray-800/80 transition-all hover:transform hover:-translate-y-2 group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-800/30 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text">What Our</span> Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 relative">
              <div className="absolute -top-5 -left-5 text-6xl text-indigo-500 opacity-50">"</div>
              <p className="mb-6 relative z-10">ShopFlix completely changed the way I shop and enjoy entertainment. Having everything in one place saves me so much time. The recommendations are spot on!</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-red-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-400">Premium Member</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 relative md:translate-y-8">
              <div className="absolute -top-5 -left-5 text-6xl text-indigo-500 opacity-50">"</div>
              <p className="mb-6 relative z-10">The streaming quality is fantastic, and the product range is impressive. I've discovered so many new movies and products I wouldn't have found elsewhere.</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-purple-500 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-gray-400">Movie Enthusiast</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 relative">
              <div className="absolute -top-5 -left-5 text-6xl text-indigo-500 opacity-50">"</div>
              <p className="mb-6 relative z-10">The customer service is outstanding. When I had an issue with my order, they resolved it immediately. Plus, the exclusive deals for members are truly worth it!</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-400">Frequent Shopper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-900/70 to-red-900/70 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-500 opacity-20 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-md relative z-10">Get early access to new releases, exclusive deals, and personalized recommendations.</p>
          
          <form onSubmit={handleSubscribe} className="relative z-10 flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-3 rounded-full bg-gray-800/80 border border-gray-700 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
            <button 
              type="submit"
              className="md:w-auto w-full px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-indigo-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              Subscribe
            </button>
          </form>
          
          {isSubscribed && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 relative z-10">
              Thank you for subscribing! Check your inbox soon for exclusive offers.
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 pt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-indigo-500 text-transparent bg-clip-text mb-6">
                ShopFlix
              </div>
              <p className="text-gray-400 mb-6">
                Your one-stop destination for shopping and entertainment. Discover, shop, and stream - all in one place.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">Categories</h3>
              <ul className="space-y-3">
                <li><Link to="/category/electronics" className="text-gray-400 hover:text-white transition-colors">Electronics</Link></li>
                <li><Link to="/category/fashion" className="text-gray-400 hover:text-white transition-colors">Fashion</Link></li>
                <li><Link to="/movies" className="text-gray-400 hover:text-white transition-colors">Action Movies</Link></li>
                <li><Link to="/movies" className="text-gray-400 hover:text-white transition-colors">Drama Series</Link></li>
                <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="mr-3 text-indigo-400 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-400">support@shopflix.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="mr-3 text-indigo-400 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li>
                  <Link to="/contact" className="inline-block px-6 py-2 mt-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors">
                    Send a Message
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* App Download Section */}
          <div className="border-t border-gray-800 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold text-xl mb-3">Download Our App</h3>
                <p className="text-gray-400 max-w-md">Get the full ShopFlix experience on your mobile device. Download now!</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors px-6 py-3 rounded-xl flex items-center">
                  <div className="mr-3">
                    {/* Apple Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.665 15.182c-.39.886-.965 1.66-1.772 2.311-.77.62-1.688.93-2.757.93-.438 0-.923-.055-1.453-.168-.53-.11-1.033-.308-1.508-.596-.48-.287-.91-.678-1.293-1.17-.383-.492-.725-1.094-.988-1.806-.265-.71-.397-1.465-.397-2.266 0-.676.132-1.312.397-1.91.264-.598.606-1.106 1.016-1.526.41-.42.882-.736 1.414-.945.532-.209 1.114-.314 1.746-.314.424 0 .846.05 1.267.15.422.099.826.24 1.211.42.386.18.737.43 1.055.75.317.319.554.674.711 1.064.157.39.236.828.236 1.312 0 .39-.065.782-.195 1.176-.13.394-.338.77-.625 1.128-.287.357-.667.668-1.142.93-.475.262-1.092.433-1.853.514-.547.06-1.155.09-1.82.09-.413 0-.855-.03-1.327-.09-.47-.06-.903-.145-1.299-.256-.396-.111-.765-.257-1.107-.44-.342-.184-.657-.39-.945-.62-.288-.23-.55-.485-.785-.77-.236-.284-.423-.62-.56-.995-.137-.375-.205-.786-.205-1.235 0-.386.09-.74.27-1.06.18-.32.434-.59.76-.81.325-.22.715-.39 1.17-.51.456-.12.982-.18 1.578-.18.492 0 .932.055 1.317.165.422.11.735.26 1.05.45.315.19.58.405.795.645.215.24.385.525.51.855.125.33.188.71.188 1.14 0 .33-.045.615-.135.855-.09.24-.225.435-.405.585-.18.15-.41.255-.69.315-.28.06-.595.09-.945.09-.35 0-.68-.03-1-.09-.32-.06-.61-.165-.87-.315-.26-.15-.49-.345-.69-.585-.2-.24-.355-.525-.465-.855-.11-.33-.165-.615-.165-.855 0-.43.063-.81.188-1.14.125-.33.295-.615.51-.855.215-.24.48-.455.795-.645.315-.19.655-.34 1.05-.45.385-.11.825-.165 1.317-.165.596 0 1.122.06 1.578.18.455.12.845.29 1.17.51.325.22.58.49.76.81.18.32.27.674.27 1.06 0 .45-.068.86-.205 1.235-.137.375-.324.71-.56.995-.235.285-.497.54-.785.77-.288.23-.603.436-.945.62-.342.184-.711.33-1.107.44-.396.111-.83.196-1.299.256-.47.06-.903.09-1.327.09-.636 0-1.216-.105-1.74-.314-.532-.209-1.004-.525-1.414-.945-.41-.42-.752-.928-1.016-1.526-.265-.598-.397-1.234-.397-1.91 0-.801.132-1.556.397-2.266.263-.712.605-1.314.988-1.806.383-.492.813-.883 1.293-1.17.475-.288.978-.486 1.508-.596.53-.113 1.015-.168 1.453-.168 1.07 0 1.987.31 2.757.93.807.65 1.382 1.424 1.772 2.311.39.887.585 1.886.585 2.995 0 1.109-.195 2.108-.585 2.995zm0 0"/>
                    </svg>
                  </div>
                  <span>App Store</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors px-6 py-3 rounded-xl flex items-center">
                  <div className="mr-3">
                    {/* Google Play Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.35 11.1h-9.18v2.72h5.19c-.22 1.21-.87 2.21-1.86 2.88l3.01 2.34c1.76-1.62 2.78-4.01 2.78-6.94 0-.64-.06-1.26-.17-1.86zM12.17 21c2.54 0 4.68-.84 6.24-2.28l-3.01-2.34c-.84.56-1.92.89-3.23.89-2.48 0-4.58-1.67-5.33-3.92H3.43v2.46A9.94 9.94 0 0 0 12.17 21zM6.84 12c0-.86.15-1.68.42-2.46V7.08H3.43A9.99 9.99 0 0 0 3 12c0 1.54.36 3.01 1 4.32l3.01-2.46A5.927 5.927 0 0 1 6.84 12zM12.17 5.99c1.38 0 2.63.48 3.6 1.42l2.7-2.7C16.84 3.31 14.72 2.5 12.17 2.5 7.64 2.5 3.98 5.39 3.43 7.08h3.41c.75-2.25 2.85-3.92 5.33-3.92z"/>
                    </svg>
                  </div>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Home;
