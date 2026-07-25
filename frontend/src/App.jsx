import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import Login from './pages/Login'
import Restuarant from './pages/Restuarant'
import Offers from './pages/Offers'
import Contact from './pages/Contact'
import Loader from './components/Loader'

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Force scroll to top on every navigation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Disable browser scroll-restoration on refresh
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
            <div className='w-full min-h-screen bg-black text-white relative overflow-x-hidden flex flex-col justify-between'>
                {loading && <Loader />}
                {!isLoginPage && <Navbar setShowLogin={setShowLogin} />}
                <div className="flex-1">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/offers' element={<Offers />} />
                        <Route path='/restaurant' element={<Restuarant />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/wishlist' element={<Wishlist />} />
                        <Route path='/order' element={<PlaceOrder />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </div>
                {!isLoginPage && <Footer />}
            </div>
        </>
    )
}

export default App