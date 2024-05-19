import './App.css';
import Nav from './components/nav/Nav';
import Footer from './views/footer/Footer';
import Home from './views/home/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from './views/user/User';
import Product from './views/user/Product';
import Login from './views/login/login';
import Register from './views/login/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductAdmin from './views/product/ProductAdmin';
import { useState } from 'react';
function App() {
  const [searchValue, setSearchValue] = useState();
  const handleSearch = (value) => {
    setSearchValue(value)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Footer />} />
            <Route path="/product" element={<Product searchValue={searchValue} />} />
            <Route path="/adminProduct" element={<ProductAdmin />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </header>

        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
