import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate your API call here
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="bg-indigo-700 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get in Touch with ShopFlix
            </h2>
            <p className="text-indigo-200 mb-8">
              Join billions of satisfied users. We are here to help you with any questions,
              feedback, or inquiries about our shopping and streaming experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-indigo-200">
                <Mail className="w-6 h-6 mr-3" />
                <span>support@shopflix.com</span>
              </div>
              <div className="flex items-center text-indigo-200">
                <Phone className="w-6 h-6 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-indigo-200">
                <MapPin className="w-6 h-6 mr-3" />
                <span>123 ShopFlix Avenue, Silicon Valley, CA</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-full transition-all transform hover:scale-105"
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </button>
              {submitted && (
                <p className="text-center text-green-600 font-medium">Thank you for contacting us!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
