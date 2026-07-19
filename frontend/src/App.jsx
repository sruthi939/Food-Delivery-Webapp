import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Offers from './pages/Offers'
import Restuarant from './pages/Restuarant'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'

const App = () => {
    return (
        <div className='w-full min-h-screen bg-black text-white'>
            <Navbar />
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
    )
}

export default App