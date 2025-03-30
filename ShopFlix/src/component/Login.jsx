import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.jwtToken) {
          // Remove previous userId if it exists
          if (localStorage.getItem("userId")) {
            localStorage.removeItem("userId");
          }
  
          // Store JWT and user email
          localStorage.setItem("jwtToken", data.jwtToken);
          localStorage.setItem("userEmail", data.username);
  
          try {
            // Fetch user details using the stored email
            const userResponse = await fetch(
              `http://localhost:8080/api/user/${data.username}`,
              {
                headers: { Authorization: `Bearer ${data.jwtToken}` },
              }
            );
  
            const userData = await userResponse.json();
  
            // Store userId in localStorage if available
            if (userData?.id) {
              localStorage.setItem("userId", userData.id);
            } else {
              console.warn("User ID not found in API response");
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
  
          // Navigate after everything is done
          navigate("/shop");
        } else {
          setError("Token not received. Please try again.");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Connection error. Please check your internet and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        {/* Logo/Brand (optional) */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Create an account
            </a>
          </p>
        </form>

        {/* Social Sign-in (Optional) */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.66 15.63 16.89 16.795 15.72 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                <path d="M12 23C14.97 23 17.46 22.015 19.28 20.335L15.72 17.575C14.73 18.225 13.48 18.625 12 18.625C9.13 18.625 6.72 16.73 5.82 14.165H2.17V17.015C3.98 20.565 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.82 14.165C5.6 13.515 5.48 12.82 5.48 12.115C5.48 11.41 5.6 10.715 5.82 10.065V7.215H2.17C1.4 8.645 1 10.35 1 12.115C1 13.88 1.4 15.585 2.17 17.015L5.82 14.165Z" fill="#FBBC05"/>
                <path d="M12 5.49C13.62 5.49 15.06 6.02 16.21 7.11L19.36 3.96C17.45 2.19 14.97 1 12 1C7.7 1 3.98 3.435 2.17 6.985L5.82 9.835C6.72 7.27 9.13 5.49 12 5.49Z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.446 18.627 0.073 12 0.073C5.373 0.073 0 5.446 0 12.073C0 18.063 4.388 23.027 10.125 23.927V15.573H7.078V12.073H10.125V9.453C10.125 6.466 11.917 4.823 14.658 4.823C15.97 4.823 17.344 5.031 17.344 5.031V7.995H15.83C14.34 7.995 13.875 8.91 13.875 9.848V12.073H17.203L16.671 15.573H13.875V23.927C19.612 23.027 24 18.063 24 12.073Z" fill="#1877F2"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;