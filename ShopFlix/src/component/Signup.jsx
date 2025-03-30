import React, { useState } from "react";
import { User, Mail, Lock, Phone, UserCircle } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "USER",
    terms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : (name === "gender" ? value.charAt(0).toUpperCase() + value.slice(1) : value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        alert(`Registration failed: ${errorText}`);
        setIsLoading(false);
        return;
      }
  
      const result = await response.json();
      setIsLoading(false);
      alert("Registration successful");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md transition-transform duration-300 hover:shadow-xl">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-8 text-center">
          <div className="inline-block bg-white/20 p-3 rounded-full mb-3">
            <UserCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <p className="text-blue-100 mt-1">Join thousands of happy users today</p>
        </div>
        
        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input
                name="name"
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input
                name="phoneNo"
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Gender Select */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full pl-4 pr-8 py-3 border border-gray-200 rounded-lg bg-white text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input
                name="password"
                type="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-colors"
                required
              />
            </div>

            <input type="hidden" name="role" value="USER" />

            {/* Terms Checkbox */}
            <div className="flex items-start mt-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account? <a href="/login" className="text-blue-600 hover:underline font-medium">Sign In</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;