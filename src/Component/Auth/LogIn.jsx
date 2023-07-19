import React, { useContext, useState } from 'react';
import classes from './LogIn.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../Store/Cart-context';


const Login = () => {
  const ctx=useContext(CartContext);
   const navigate=useNavigate();
   const [isdisabled,setDisabled]=useState(false);
   
   const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
        try{
          fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgmSRRfCUQUKwn0F8QuuODw2DaApM3JXw`, {
            method: 'POST',
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
            headers: {
              'Content-type': 'application/json'
            }
          })
            .then(res => {
              if (res.ok) {
                // Signup success
                return res.json(); // Parse response JSON
              } else {
                // Show error message
                let errorMessage = "Authentication Failed";
                if (res && res.error && res.error.message) {
                  errorMessage = res.error.message;
                }
                throw new Error(errorMessage);
              }
            })
            .then(data => {
             console.log(data);
             let value={
              idToken:data.idToken,
              email:data.email
             }
             ctx.logIn(value);
             navigate('/Home');
             alert("Logged in successfully");
         
           
            
            })
            .catch(error => {
              // Handle fetch error
              alert("Authentication failed");
            });
        }
        catch(error)
        {
          alert("Authentication failed");
        }
    
        setDisabled(false);
  };

  const handleSignup=()=>{
    navigate("/SignUp");
  }


  return (
    <div className={classes.logincontainer}>
      <h2 className={classes.titlelogin}>Log in</h2>

      <form  className = {classes.loginform}>
        <div className={classes.loginformGroup}>
          <label htmlFor='email'>Email:</label>
          <input className={classes.inputlog}
            type="email"
            name="email"
            id='email'
            value={formData.email}
            onChange={handleChange}
            autocomplete="current-password" 
            required
          />

        </div>
        <div className={classes.loginformGroup}>
          <label htmlFor='password'>Password:</label>
          <input  className={classes.inputlog}
            type="password"
            name="password"
            id='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
       
        <button className={classes.logbutton} onClick={handleSubmit} disabled={isdisabled}>Log in</button>
        <button className={classes.logbutton} onClick={handleSignup} disabled={isdisabled}>Create new account</button>
        <Link to="/ForgetPassword" className={classes.active}>
  forget password
</Link>
      </form>
    </div>
  );
};

export default Login;
