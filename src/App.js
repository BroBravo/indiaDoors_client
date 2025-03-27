//import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home'
import Contact from './pages/ContactUs'
import About from './pages/AboutUs'
import Login from './pages/LoginPage'
import ProfilePage from "./pages/ProfilePage"; 
import {Routes,Route,  } from 'react-router-dom'
import Footer from './components/footer';
import CustomDoor from './pages/CustomDoor';
function App() {
  return (
    <div className="App">
     
        <Navbar/>
        
      
      <Routes>
         <Route path="/" element={<Home />} /> {/* Default Route */}
         <Route path="/home" element={<Home />} />
         < Route  path='/about' element={<About/> }/>
         < Route  path='/contact' element={<Contact/>}/>
         < Route  path='/login' element={<Login/>}/>
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/custom-door" element={<CustomDoor/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
