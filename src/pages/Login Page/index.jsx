import './index.scss';
import axios from 'axios';
import {useState} from 'react'
function LoginPage()
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [token, setToken] = useState(null);
  const [error, setError] = useState("");
    
   const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      },{withCredentials: true});

     // Save token
     // setToken(response.data.token);
      alert(`Welcome, ${response.data.username}!`);
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
     <div className="container_style">
      
        <img src='/loginImage.png' alt='login' className='login_image'/>
        <form className="form_style" onSubmit={handleLogin}>
          <input className="input_style" type='text' id="username" 
          placeholder='User name' value={username} onChange={(e)=>setUsername(e.target.value)} required/> 
        
        
          <input className="input_style" type='password'id="password" 
          placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/> 
        
        <button className="button_style button_hover_style" type='submit'>Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        

        
     </div>
    </>
    );
}

export default LoginPage;