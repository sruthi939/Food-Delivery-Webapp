import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Offers from './pages/Offers'
import Restuarant from './pages/Restuarant'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Loader from './components/Loader'
import Footer from './components/Footer'
import Login from './components/Login'

const App = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [showLogin, setShowLogin] = useState(false)

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

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

    return (
        <>
            {showLogin ? <Login /> : <></>}
            <div className='w-full min-h-screen bg-black text-white relative overflow-x-hidden flex flex-col justify-between'>
                {loading && <Loader />}
                <Navbar setShowLogin={setShowLogin} />
                <div className="flex-1">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/offers' element={<Offers />} />
                        <Route path='/restuarant' element={<Restuarant />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/order' element={<PlaceOrder />} />
                    </Routes>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default App