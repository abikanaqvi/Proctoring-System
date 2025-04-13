import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './containers/register/Signup';
import Login from './containers/login/Login';
import Landing from './containers/landing/Landing';
import ProtectedRoute from './components/ProtectedRoute'; // Import the protected route

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to Register page */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Public Routes */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route: Landing page is only accessible after login */}
        <Route 
          path="/landing" 
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
