import React from 'react';
import { BookOpen, TrendingUp, Award, ArrowRight } from 'lucide-react';

const Blog = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white rounded-2xl shadow-2xl my-12 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-10 space-y-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-indigo-300 mr-3" />
            <h2 className="text-3xl font-bold">Our Blog</h2>
          </div>
          <p className="text-lg text-indigo-100 leading-relaxed">
            Join over 20 million people who trust ShopFlix for the ultimate shopping and entertainment experience.
            Our blog is your go-to destination for expert tips, the latest trends, and in-depth reviews.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 text-indigo-300 mr-2" />
              <span className="text-base">Weekly trending products and movies</span>
            </div>
            <div className="flex items-center">
              <Award className="w-6 h-6 text-indigo-300 mr-2" />
              <span className="text-base">Exclusive interviews with creators</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-indigo-300 mr-2" />
              <span className="text-base">Behind-the-scenes content</span>
            </div>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-800 font-semibold rounded-full shadow-lg transform transition hover:scale-105 hover:bg-indigo-100"
          >
            Read Our Blog
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
        <div className="md:w-1/3 flex items-center justify-center p-10">
          <img
            src="https://m.media-amazon.com/images/I/71pOxbr7GjL._AC_UY327_FMwebp_QL65_.jpg"
            alt="ShopFlix Blog"
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
