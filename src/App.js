//import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home'
import Contact from './pages/ContactUs'
import About from './pages/AboutUs'
import Login from './pages/LoginPage'
import ProfilePage from "./pages/ProfilePage"; 
import {Routes,Route , BrowserRouter } from 'react-router-dom'
import Footer from './components/footer';
import CustomDoor from './pages/CustomDoor';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
        <Navbar/>
        
      <div style={{ flex: 1 }}>
    
      <Routes>
         <Route path="/" element={<Home />} /> {/* Default Route */}
         <Route path="/home" element={<Home />} />
         <Route  path='/about-us' element={<About/> }/>
         <Route  path='/login' element={<Login/>}/>
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/custom-door" element={<CustomDoor/>} />
         <Route path="/cart" element={<CartPage/>}/>
         <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>  
     
      </div>
      <Footer/>
    </div>
  );
}

export default App;
