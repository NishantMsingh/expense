import React, { useState } from 'react';
import classes from './LogIn.module.css'; 
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
   const navigate=useNavigate();
   
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
             alert("Logged in successfully");
             navigate('/Home');
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
    
    console.log(formData);
  };

  return (
    <div className={classes.logincontainer}>
      <h2 className={classes.titlelogin}>Log in</h2>

      <form  className = {classes.loginform} onSubmit={handleSubmit}>
        <div className={classes.loginformGroup}>
          <label>Email:</label>
          <input className={classes.inputlog}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.loginformGroup}>
          <label>Password:</label>
          <input  className={classes.inputlog}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
       
        <button className={classes.logbutton} type="submit">Log in</button>
        <button className={classes.logbutton}>Create new account</button>
         <Link to="" className={classes.active}>forget password</Link>
      </form>
    </div>
  );
};

export default Login;
