//import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home'
import Contact from './pages/Contact us'
import About from './pages/About us'
import Login from './pages/Login Page'

import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        < Route index  element={<Home/>}/>
        < Route  path='/about' element={<About/> }/>
        < Route  path='/contact' element={<Contact/>}/>
        < Route  path='/Login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
