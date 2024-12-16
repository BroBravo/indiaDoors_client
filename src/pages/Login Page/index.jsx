import './index.scss';
function LoginPage()
{
   
    
  return (
    <>
    <div className="containerStyle">
      <img src='/loginImage.png' alt='login'/>
       <form className="formStyle">
        <input className="inputStyle" type='text' id="username" placeholder='User name'/> 
       
       
        <input className="inputStyle" type='password'id="password" placeholder='Password'/> 
       
       <button className="buttonStyle buttonHoverStyle">Press me</button>
       </form>
       </div>
    </>
    );
}

export default LoginPage;