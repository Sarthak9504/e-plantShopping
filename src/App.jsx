import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import LandingPage from './pages/LandingPage';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import AuthForm from './pages/AuthForm';

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Router>
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path="*" element={<AuthForm />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
