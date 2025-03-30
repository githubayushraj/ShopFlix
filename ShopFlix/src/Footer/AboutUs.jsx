import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-indigo-500 mb-8">
          About ShopFlix
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to <span className="font-bold text-indigo-600">ShopFlix</span> – your ultimate one-stop destination where shopping meets entertainment.
          Founded with a vision to revolutionize the way you shop and unwind, ShopFlix brings together a curated selection
          of high-quality products and the latest streaming content under one roof.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          At ShopFlix, we believe in offering a seamless experience that caters to your lifestyle needs. Whether you're looking for trendy fashion,
          cutting-edge electronics, or unique home essentials, our extensive product range is designed to delight and inspire.
          Simultaneously, our curated collection of movies, series, and exclusive content lets you relax and enjoy top-tier entertainment from the comfort of your home.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Our dedicated team works tirelessly to ensure that every interaction with ShopFlix is personalized and hassle-free.
          From secure payment options to exceptional customer service, we are committed to delivering value, convenience, and innovation in every aspect of our platform.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Join us on this exciting journey where you can discover, shop, and stream all in one place.
          Experience the future of retail and entertainment at ShopFlix – where your satisfaction is our priority.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
