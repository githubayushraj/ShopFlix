import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home"; 
import Transfer from "./component/Transfer";
import Shop from "./component/Shop";
import Movie from "./component/Movie";
import ProtectedRoute from "./component/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home /> 
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />, // No Navbar here
  },
  {
    path: "/signup",
    element: <Signup />, // No Navbar here
  },
  {
    path: "/transfer",
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <Transfer />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/shop",
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <Shop />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/movies",
    element: (
      <ProtectedRoute>
        <>
          <Navbar />
          <Movie />
        </>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
