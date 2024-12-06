import React from 'react';
import {
	Blog,
	Create,
	Dashboard,
	Landing,
	Login,
	Register,
	Status,
	Exam,
    Product,   
    Community,    
    Pricing,      
    Contact  
} from './containers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/register" element={<Register />} />
					<Route path="/create" element={<Create />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/status" element={<Status />} />
					<Route path="/exam" element={<Exam />} />
					<Route path="/product" element={<Product />} />  
                    <Route path="/community" element={<Community />} />  
                    <Route path="/pricing" element={<Pricing />} />  
                    <Route path="/contact" element={<Contact />} />  
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
