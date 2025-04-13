import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Blog,
  Create,
  Dashboard,
  Landing,
  Login,
  Signup,
  Status,
  Exam,
  Product,
  Community,
  About,
  Contact
} from './containers';
import './App.css';

// ✅ Protect routes - Only allow access if logged in
const PrivateRoute = ({ element }) => {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ✅ Default page is now LOGIN */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* ✅ Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/product" element={<Product />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ Blog Route (Public or protected - your choice) */}
          <Route path="/blog" element={<Blog />} />

          {/* ✅ Private Routes */}
          <Route path="/landing" element={<PrivateRoute element={<Landing />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/status" element={<PrivateRoute element={<Status />} />} />
          <Route path="/exam" element={<PrivateRoute element={<Exam />} />} />
          <Route path="/create" element={<PrivateRoute element={<Create />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
