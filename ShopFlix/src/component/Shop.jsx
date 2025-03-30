import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, TrendingUp, Gift, Clock, Star, ShoppingBag, Heart,
  Laptop, Droplet, Home 
} from 'lucide-react';
import CategorySection from './CategorySection';
import axios from 'axios';

const Shop = () => {
  // Custom hook for tracking user visits
  const [userStats, setUserStats] = useState({
    activeUsers: Math.floor(Math.random() * 100000 + 500000),
    lastRefreshed: new Date()
  });
  
  const jwtToken = localStorage.getItem('jwtToken');
  console.log(jwtToken);
  // JWT token management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!jwtToken);
    
    // Simulate live user counter
    const interval = setInterval(() => {
      setUserStats(prev => ({
        activeUsers: Math.floor(prev.activeUsers + (Math.random() * 2000 - 1000)),
        lastRefreshed: new Date()
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Enhanced categories with more options and better organization
  const categories = [
    { 
      id: 'electronics', 
      title: 'Electronics & Gadgets',
      icon: Laptop,
      featuredImage:  "https://m.media-amazon.com/images/I/61gKj643idL._SY450_.jpg",
      subCategories: [
        { name: 'Smartphones', image: "https://m.media-amazon.com/images/I/718jcIFYaAL._AC_UY327_FMwebp_QL65_.jpg" },
        { name: 'Laptops', image: "https://m.media-amazon.com/images/I/71va8MZ-bGL._AC_UY327_FMwebp_QL65_.jpg" },
        { name: 'Audio', image: "https://m.media-amazon.com/images/I/61Z3PPOvTUL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Wearables', image: "https://m.media-amazon.com/images/I/311zPwMsCYS._SX300_SY300_QL70_FMwebp_.jpg" },
        { name: 'Smart Home', image: "https://m.media-amazon.com/images/I/41Blj4RVtXL._AC_UL480_FMwebp_QL65_.jpg" }
      ]
    },
    { 
      id: 'fashion', 
      title: 'Fashion',
      icon: ShoppingBag,
      featuredImage: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/31ba14c9-25a9-45ab-aeaf-e2a7fe48d6bf._CR0,342,4928,2581_SX920_QL70_.jpg",
      subCategories: [
        { name: 'Women', image: "https://m.media-amazon.com/images/I/61qbhZDj1pL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Men', image: "https://m.media-amazon.com/images/I/31JeiPGAvaL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Kids', image: "https://m.media-amazon.com/images/I/61Mfh5kdZPL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Accessories', image: "https://m.media-amazon.com/images/I/81QMyHI7BQL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Footwear', image: "https://m.media-amazon.com/images/I/71Sw5XEi1SL._AC_UL480_FMwebp_QL65_.jpg" }
      ]
    },
    { 
      id: 'beautyandgroomings', 
      title: 'Beauty & Personal Care',
      icon: Droplet,
      featuredImage: "https://m.media-amazon.com/images/I/91hWV5SdayL._AC_UL480_FMwebp_QL65_.jpg",
      subCategories: [
        { name: 'Skincare', image: "https://m.media-amazon.com/images/I/512to3sL1kL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Makeup', image: "https://m.media-amazon.com/images/I/71ApCirPdFL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Fragrance', image: "https://m.media-amazon.com/images/I/61m1eGHEdWL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Haircare', image: "https://m.media-amazon.com/images/I/61PA2P4KDCL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Grooming', image: "https://m.media-amazon.com/images/I/71exkkMFOdL._AC_UL480_FMwebp_QL65_.jpg" }
      ]
    },
    { 
      id: 'kitchenstorage', 
      title: 'Home & Kitchen',
      icon: Home,
      featuredImage: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/511ec1ef-c1a4-4732-9a48-accc4245d12d._CR0,0,1200,628_SX810_QL70_.jpg",
      subCategories: [
        { name: 'Appliances', image: "https://m.media-amazon.com/images/I/51aI3qFT5BL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Furniture', image: "https://m.media-amazon.com/images/I/61UV7Gt4C+L._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Decor', image: "https://m.media-amazon.com/images/I/715dmJcuJZL._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Kitchen', image: "https://m.media-amazon.com/images/I/81aVWqEmrML._AC_UL480_FMwebp_QL65_.jpg" },
        { name: 'Garden', image: "https://m.media-amazon.com/images/I/61ctJAV-8dL._AC_UL480_FMwebp_QL65_.jpg" }
      ]
    }
  ];
  
  
  // Enhanced deals with better categorization, timing elements, and social proof
  const topDeals = [
    { 
      title: "Flash Sale", 
      image: "https://m.media-amazon.com/images/I/71phkb0APwL._SY695_.jpg", 
      discount: "70% OFF", 
      timeLeft: "3:45:22",
      originalPrice: "₹899.99",
      salePrice: "₹269.99",
      rating: 4.8,
      reviews: 12453,
      category: "Premium Electronics",
      badge: "TRENDING",
      link: "https://www.amazon.in/Bacca-Bucci-Elevated-Sneakers-rebounce/dp/B0B4H8SFM4?th=1&psc=1"
    },
    { 
      title: "Today's Deal", 
      image: "https://m.media-amazon.com/images/I/41-WAUcPCwL._SX679_.jpg", 
      discount: "50% OFF", 
      timeLeft: "11:24:56",
      originalPrice: "₹1,500",
      salePrice: "₹1,248",
      rating: 4.7,
      reviews: 8736,
      category: "Tech Essentials",
      badge: "POPULAR",
      link: "https://www.amazon.in/-/hi/Lenskart-Vincent-%E0%A4%B8%E0%A4%A8%E0%A4%97%E0%A5%8D%E0%A4%B2%E0%A4%BE%E0%A4%B8%E0%A5%87%E0%A4%B8-%E0%A4%95%E0%A5%89%E0%A4%AE%E0%A5%8D%E0%A4%AC%E0%A5%8B-%E0%A4%AE%E0%A4%BF%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%A4/dp/B0CPCY2LW5"
    },
    { 
      title: "Limited Edition", 
      image: "https://m.media-amazon.com/images/I/31qMi11K9PL._SY445_SX342_QL70_FMwebp_.jpg", 
      discount: "40% OFF", 
      timeLeft: "2:12:37",
      originalPrice: "₹1,39,999",
      salePrice: "₹1,49,999",
      rating: 4.9,
      reviews: 5624,
      category: "Collector's Items",
      badge: "EXCLUSIVE",
      link: "https://www.amazon.ae/Apple-iPhone-Pro-Max-256/dp/B0CHXLGXHQ"
    },
    { 
      title: "Member Exclusive", 
      image: "https://m.media-amazon.com/images/I/71r-bf42LqL._SL1500_.jpg", 
      discount: "55% OFF", 
      originalPrice: "₹499.99",
      salePrice: "₹224.99",
      timeLeft: "8:30:12",
      rating: 4.6,
      reviews: 9821,
      category: "Premium Selection",
      badge: "MEMBERS",
      link: "https://www.amazon.in/Zebronics-Soundbar-Subwoofer-Satellite-Mountable/dp/B0CJM2NST8?th=1"
    },
    { 
      title: "Best Seller", 
      image: "https://m.media-amazon.com/images/I/61aURrton0L._SL1500_.jpg", 
      discount: "30% OFF", 
      timeLeft: "5:30:45",
      originalPrice: "₹2,499",
      salePrice: "₹1,749",
      rating: 4.5,
      reviews: 15984,
      category: "Gaming Accessories",
      badge: "BESTSELLER",
      link: "https://www.amazon.in/Redgear-Mechanical-Gaming-Keyboard-Lighting/dp/B07XF5XH9H"
    },
    { 
      title: "Mega Discount", 
      image: "https://m.media-amazon.com/images/I/71cd9NZkuDL._AC_UY327_FMwebp_QL65_.jpg", 
      discount: "65% OFF", 
      timeLeft: "9:15:20",
      originalPrice: "₹5,699",
      salePrice: "₹1,999",
      rating: 4.4,
      reviews: 6742,
      category: "Home Appliances",
      badge: "HOT DEAL",
      link: "https://www.amazon.in/Sandwich-Resistant-Multifunction-Automatic-Warranty/dp/B0CSFP59JG/ref=sr_1_1_sspa?crid=LPLYSXCYFSKK&dib=eyJ2IjoiMSJ9.j0_O-06tzHYQH7zzm2Fm8Gj9raTCPgqIyCQEmt7EhoFY6rulmKE7fi5NbHR9DamCqWm3ierTC85ljyiOtlUSgLwVdu5GqPUE8fC1IqI_LZ3tOjUojFTrvBUCcut7XmXcamIkxURh_XBWd8_m2o3Ev7v4HqEjgmbQ23RXUwkndvj4PR8GkbuU9zDUy4QDTXOinYU9CIeo4gnTYybm9y6RHm6dIUzMtyrykFXDCOe8PRo.4FZMhvOkSi3apS8SRMCotBbQkjd2RYiWDisNiT6qbUU&dib_tag=se&keywords=home%2Bappliances%2Bkitchen&qid=1742576366&sprefix=home%2Bappliance%2Caps%2C383&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
    },
    { 
      title: "Limited Stock", 
      image: "https://m.media-amazon.com/images/I/61Y30DpqRVL._SL1500_.jpg", 
      discount: "20% OFF", 
      timeLeft: "1:58:30",
      originalPrice: "₹74,999",
      salePrice: "₹59,999",
      rating: 4.7,
      reviews: 8291,
      category: "Laptops",
      badge: "LIMITED STOCK",
      link: "https://www.amazon.in/Dell-Inspiron-i5-1135G7-512GB-Windows/dp/B0BSNWRWWV"
    },
    { 
      title: "Seasonal Offer", 
      image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/29795058-212a-4584-bdd9-602589fae763._CR0,0,1200,628_SX920_QL70_.jpg", 
      discount: "45% OFF", 
      timeLeft: "6:00:00",
      originalPrice: "₹3,499",
      salePrice: "₹1,924",
      rating: 4.6,
      reviews: 5694,
      category: "Smartwatches",
      badge: "SEASONAL",
      link: "https://www.amazon.in/stores/page/C2539EFC-5985-40DA-A0DE-276F3AA04939/?_encoding=UTF8&store_ref=SB_A09084102W3FWKLKA59OM-A0358287B8O8LLBFXAY1&pd_rd_plhdr=t&aaxitk=a097facfa4467ed7f37ef6be098f0526&hsa_cr_id=0&lp_asins=B0C5X2MGX3%2CB0C5X2JV72%2CB0CSPQZBT7&lp_query=smartwatch%20for%20woman&lp_slot=desktop-hsa-3psl&ref_=sbx_be_s_3psl_mbd_mb2_ls&pd_rd_w=LhTuU&content-id=amzn1.sym.f1a4d09d-a292-48da-a86f-03294c9a41ef%3Aamzn1.sym.f1a4d09d-a292-48da-a86f-03294c9a41ef&pf_rd_p=f1a4d09d-a292-48da-a86f-03294c9a41ef&pf_rd_r=5HG0S3PA4SJNQDDE2FGJ&pd_rd_wg=8aM6m&pd_rd_r=79d46f28-e9bd-4a06-abf3-8550aee0e566"
    },
    { 
      title: "Super Saver", 
      image: "https://m.media-amazon.com/images/I/71hfNZjwufL._AC_UL480_FMwebp_QL65_.jpg", 
      discount: "80% OFF", 
      timeLeft: "8:30:12",
      originalPrice: "₹999",
      salePrice: "₹199",
      rating: 4.2,
      reviews: 3842,
      category: "Fitness Gear",
      badge: "SUPER SAVER",
      link: "https://www.amazon.in/ODDISH-way-fitness-Double-trimmer/dp/B09T38X3GZ/ref=sr_1_26?crid=1XG1Z3J728HZY&dib=eyJ2IjoiMSJ9.OwLCQvUkh-1YGAsW1dUjnup4TNjZVGJM9RPDutWgLv0abbwA3jo11kOtLhnfqtJ_0TLpCzibKbfl2CDj-O6aWsQEZccnCS0EXUiso8KD9CWqNr4NlBpzkEoDVr5nf-seIcZS4zyKyj3wmT6x4yUF8GpvBjShpvb46-3yzcY798TXs3ypd92OZmjH5pMVIiIcfsdu8LB_0V31z57f6hP7ak6KuKp4DVPDjb-9_p1NsCgF3yX9qz1noDTJ5xXKqjJjpZNyaE5YQdKtMOJCzPgziePcIN9yQsxGIWMAW6pydAtpkigeVD0wTUCS9Grde01Fjjvs__Iib3JzFXl7YA5ftrFsrz_4Kc29HwEO4_Y_k5AYTsCAIezqvjNU2yh9IPW-ui1BLnn4f5Ad64fWCQc5Sbz0C-Gaxvi3zoOsYQudV5ZG-4F962i_lfSg5g3_Dkqv.ubvNGYQ4cpkjg_HzuhzwaeDbCtdoKPM9ClBSliVgrkI&dib_tag=se&keywords=fitness%2Bgear&qid=1742576973&sprefix=fitness%2Bgea%2Caps%2C391&sr=8-26&th=1"
    },
    { 
      title: "Top Pick", 
      image: "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UY327_FMwebp_QL65_.jpg", 
      discount: "35% OFF", 
      timeLeft: "4:22:10",
      originalPrice: "₹4,599",
      salePrice: "₹2,999",
      rating: 4.8,
      reviews: 7285,
      category: "Headphones & Audio",
      badge: "TOP PICK",
      link: "https://www.amazon.in/Sony-Bluetooth-Headphones-Multipoint-Connectivity/dp/B0BS1RT9S2/ref=sr_1_9?crid=3IDNY69T3J76Q&dib=eyJ2IjoiMSJ9.U2typkoQNBgrulXtL9h2j3BNsmI5xQKLHOXxRajTSJX8VzydfaFfOmElWyTrol_5gqD0Y60SmVa9Wk101QY6_Sr9vN4vZkIhBNQwnuhYlzIjWOPqPcWU6Uw73s1tqd_fqJXciEmKIzNzQ4IlSHCuxSVEvak1Grr8YM5YmN6QSIEeB1OpDDbwi9k86y_eBpl0_XvG-VhnX04QpywkODhpIsjwG0JaqiHpQLQQ7_TKwJ0.T4EoZHYxgzeJiz2PFfnnu_PNrFZYrYQ4ItPLVQhj_p8&dib_tag=se&keywords=headphones%2Bwireless%2Bwith%2Bmic&qid=1742577110&sprefix=HEad%2Caps%2C409&sr=8-9&th=1"
    }
  ];
  

  // Trending items with real-time data indicators (each with a link)
  const trendingItems = [
    {
      name: "Travel Backpack",
      image: "https://m.media-amazon.com/images/I/81tHUvzVEjL._SY879_.jpg",
      price: "$249.99",
      trend: "+125% searches today",
      stock: "Limited stock",
      rating: 4.9,
      category: "Wearables",
      link: "https://www.amazon.in/Aircontact-High-Capacity-Ventilation-Multi-Day-Mountaineering/dp/B097PZ45S5"
    },
    {
      name: "Women's Sadiya",
      image: "https://m.media-amazon.com/images/I/71kYTvajnQL._SY695_.jpg",
      price: "$179.99",
      trend: "+87% searches today",
      stock: "Selling fast",
      rating: 4.8,
      category: "Audio",
      link: "https://www.amazon.ae/Badgley-Mischka-Womens-Sadiya-Silver/dp/B09QFW5GL7"
    },
    {
      name: "Ultra-thin Laptop 14\"",
      image: "https://m.media-amazon.com/images/I/61w2HawBGoL._SX679_.jpg",
      price: "$1,299.99",
      trend: "+65% searches today",
      stock: "New release",
      rating: 4.7,
      category: "Computers",
      link: "https://www.amazon.in/Refurbished-Lenovo-IdeaPad-Backlit-82XE0072IN/dp/B0CWGZLM66"
    },
    {
      name: "Smart Home Hub",
      image: "https://m.media-amazon.com/images/I/31t1+4K+y0L._AC_SL1200_.jpg",
      price: "$129.99",
      trend: "+94% searches today",
      stock: "Almost gone",
      rating: 4.6,
      category: "Smart Home",
      link: "https://www.amazon.com/Aqara-Presence-Sensor-Plus-Smart/dp/B0CVVRMBCL"
    },
    {
      name: "Premium Skincare Set",
      image: "https://m.media-amazon.com/images/I/51FB1gYtpGL._SX300_SY300_QL70_FMwebp_.jpg",
      price: "$89.99",
      trend: "+112% searches today",
      stock: "Trending now",
      rating: 4.8,
      category: "Beauty",
      link: "https://www.amazon.in/Boosters-Premium-Sunscreen-Moisturizer-Packaging/dp/B0C8D6NCP4"
    },
    {
      name: "Professional Camera",
      image: "https://m.media-amazon.com/images/I/71z7B11WBlL._SL1500_.jpg",
      price: "$1,499.99",
      trend: "+73% searches today",
      stock: "Just restocked",
      rating: 4.9,
      category: "Photography",
      link: "https://www.amazon.com/Fujifilm-Mirrorless-Camera-Additional-Accessories/dp/B0CJY2DLB3"
    }
  ];

  // Carousel control for Top Deals
  const carouselRef = useRef(null);
  
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Banner data with personalization
  const banners = [
    {
      title: "SPRING MEGA SALE",
      subtitle: "Up to 70% OFF on Premium Brands",
      cta: "Shop Now",
      bgColor: "from-purple-600 to-blue-500",
      image: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg",
      showLimitedTime: true
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Be the First to Try Our Latest Products",
      cta: "Discover More",
      bgColor: "from-emerald-500 to-teal-400",
      image: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Unrec/Shoes/1/30001._CB542120021_.jpg",
      showTrending: true
    },
    {
      title: "EXCLUSIVE OFFERS",
      subtitle: "Limited Time Deals on Top-Selling Items",
      cta: "Grab Deal",
      bgColor: "from-red-600 to-orange-500",
      image: "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg",
      showLimitedTime: true
    }
  ];
  
  const [currentBanner, setCurrentBanner] = useState(0);
  
  // Banner rotation
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 2000);
    
    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  return (
    <div className="w-full px-4 max-w-7xl mx-auto">
      {/* Live counter */}
      <div className="bg-gray-100 rounded-full px-4 py-1 text-xs text-gray-700 flex items-center justify-center mb-3 max-w-xs mx-auto">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
        {userStats.activeUsers.toLocaleString()} shoppers active now
      </div>
      
      {/* Hero Carousel */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div className={`absolute inset-0 bg-gradient-to-r ${banners[currentBanner].bgColor}`}></div>
        <div className="relative h-72 md:h-96 flex items-center">
          <div className="p-8 md:p-12 w-full md:w-1/2 z-10">
            <div className="flex items-center mb-2">
              {banners[currentBanner].showLimitedTime && (
                <div className="bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center mr-2">
                  <Clock size={12} className="mr-1" /> LIMITED TIME
                </div>
              )}
              {banners[currentBanner].showTrending && (
                <div className="bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center">
                  <TrendingUp size={12} className="mr-1" /> TRENDING
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              {banners[currentBanner].title}
            </h1>
            <p className="text-lg md:text-xl font-medium text-white opacity-90 mb-6">
              {banners[currentBanner].subtitle}
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105">
                {banners[currentBanner].cta}
              </button>
              {isAuthenticated && (
                <button className="bg-transparent border-2 border-white text-white font-medium py-3 px-6 rounded-full hover:bg-white/10">
                  Personalize
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:block absolute right-0 bottom-0 w-1/2 h-full">
            <img
              src={banners[currentBanner].image}
              alt="Sale promotion"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        {/* Carousel controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full ${currentBanner === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Category Quick Navigation */}
      <div className="mb-10">
        <div className="flex overflow-x-auto py-2 scrollbar-hide">
          {categories.map((category, index) => (
            <a 
              key={index} 
              href={`/category/${category.id}`} 
              className="flex flex-col items-center min-w-[100px] px-2"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-2 shadow-sm">
                <category.icon className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-center">
                {category.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Top Deals Carousel */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Today's Best Deals</h2>
            <p className="text-sm text-gray-500">Updated hourly based on popularity</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={handlePrev} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
        >
          {topDeals.map((deal, index) => (
            <a 
              key={index}
              href={deal.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-w-[250px] max-w-[250px] bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative">
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {deal.discount}
                </div>
                {deal.badge && (
                  <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                    {deal.badge}
                  </div>
                )}
                <div className="h-48 flex items-center justify-center p-4">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
                {deal.timeLeft && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 px-2 flex items-center justify-center">
                    <Clock size={12} className="mr-1" /> Ends in: {deal.timeLeft}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{deal.category}</div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{deal.title}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-lg font-bold">{deal.salePrice}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">{deal.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs ml-1">{deal.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({deal.reviews.toLocaleString()})</span>
                  </div>
                  <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Trending Now Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp size={24} className="mr-2 text-red-500" /> Trending Now
            </h2>
            <p className="text-sm text-gray-500">What shoppers are loving right now</p>
          </div>
          <a href="/trending" className="text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium">
            View all
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="relative h-40 flex items-center justify-center p-4 bg-gray-50">
                <img 
                  src={item.image || "/api/placeholder/150/150"} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                />
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} className="text-gray-600" />
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center mb-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs ml-1">{item.rating}</span>
                </div>
                <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                <p className="text-sm font-bold mb-1">{item.price}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600 font-medium flex items-center">
                    <TrendingUp size={10} className="mr-0.5" /> {item.trend}
                  </span>
                  <span className="text-xs text-gray-600">{item.stock}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {categories.map((category) => (
          <div key={category.id} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <a 
                href={`/category/${category.id}`} 
                className="text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium"
              >
                View all
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Main featured item */}
              <a
                href={`/category/${category.id}`}
                className="md:col-span-2 md:row-span-2 bg-gray-50 rounded-lg overflow-hidden relative group cursor-pointer block"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={category.featuredImage} 
                  alt={`${category.title} Featured`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-lg font-bold mb-1">Featured Collection</h3>
                  <p className="text-white/90 text-sm mb-3">Discover the best of {category.title}</p>
                  <button className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium py-2 px-4 rounded-full">
                    Shop Collection
                  </button>
                </div>
              </a>
              {/* Sub-categories */}
              {category.subCategories.slice(0, 6).map((subCat, i) => (
                <a 
                  key={i}
                  href={`/category/${category.id}?sub=${encodeURIComponent(subCat.name)}`}
                  className="block bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="h-32 flex items-center justify-center p-4">
                    <img 
                      src={subCat.image} 
                      alt={subCat.name} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                  <div className="p-3 border-t">
                    <h3 className="text-sm font-medium text-center">{subCat.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}



      {/* Personalized Recommendations with Social Proof */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <p className="text-sm text-gray-500">Based on your browsing history and similar shoppers</p>
          </div>
          <a 
            href="/recommendations" 
            className="text-blue-600 hover:underline hover:text-blue-800 text-sm font-medium"
          >
            View all
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="relative h-40 flex items-center justify-center p-4 bg-gray-50">
                <img  
                  src="/api/placeholder/150/150" 
                  alt={`Recommendation ${i+1}`} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                />
                <button className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-600 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShoppingBag size={16} />
                </button>
              </div>
              <div className="p-3">
                <div className="flex items-center mb-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs ml-1">(2k+)</span>
                </div>
                <p className="text-xs line-clamp-2 mb-1">Premium Quality Product with Top Features</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">$149.99</span>
                  <span className="text-xs text-gray-500 line-through">$299.99</span>
                </div>
                <div className="mt-1">
                  <span className="text-xs text-green-600">10+ people bought this today</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter + App Download Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Get Exclusive Deals</h3>
          <p className="mb-4 text-blue-100">Subscribe to our newsletter and receive special offers.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 rounded-l-lg w-full text-gray-900 focus:outline-none" 
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-4 py-2 rounded-r-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl p-6 flex items-center">
          <div className="mr-4">
            <img src="https://strapi.dhiwise.com/uploads/street_style_e_commerce_app_flutter_3_40da04924e.jpg" alt="Mobile App" className="w-20 h-20 rounded-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Shop On The Go</h3>
            <p className="text-gray-600 mb-3 text-sm">Download our app for a better shopping experience.</p>
            <div className="flex space-x-2">
              <button className="bg-black text-white text-xs px-3 py-1 rounded flex items-center">
                <span>App Store</span>
              </button>
              <button className="bg-black text-white text-xs px-3 py-1 rounded flex items-center">
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;












