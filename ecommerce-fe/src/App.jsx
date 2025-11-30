import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import Overview from './pages/dashboard/Overview';
import UserManagement from './pages/dashboard/UserManagement/UserManagement';
import ProductManagement from './pages/dashboard/ProductManagement/ProductManagement';
import OrderManagement from './pages/dashboard/OrderManagement';
import Category from './pages/dashboard/CategoryManagement/Category';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import Cart from './pages/home/cart/Cart';
import ProductPage from './pages/home/ProductPage';
import { UpdateProduct } from './pages/dashboard/ProductManagement/UpdateProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Overview />} />
          <Route path='/user-management' element={<UserManagement />} />
          <Route path='/product-management' element={<ProductManagement />} />
          <Route path='/order-management' element={<OrderManagement />} />
          <Route path='/category' element={<Category />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/update-product/:id' element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
