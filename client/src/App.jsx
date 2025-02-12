import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
// import Home from './Home';
import Landing from './containers/landing/Landing'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" to "/register" (or "/home" if you prefer) */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Other routes */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
