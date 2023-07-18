import React, {useState } from 'react';
import classes from './Signup.module.css'; 
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate=useNavigate();
  const [isdisabled,setDisabled]=useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);

    if(formData.password===formData.confirmPassword && formData.password.length>6 && formData.email.includes("@"))
    {
      try
      {
        
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgmSRRfCUQUKwn0F8QuuODw2DaApM3JXw`, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          returnSecureToken: true
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(res => {
      
          if (res.ok) {
            // Signup success
            alert("Account created successfully  Login now");
            
          } else {
            res.json().then(result => {
              // Show error message
              let errorMessage = "Authentication Failed";
              if (result && result.error && result.error.message) {
                errorMessage = result.error.message;
                throw new Error(errorMessage);
              }
              else
              {
                alert("Account created successfully -- Login now");
              }
              
            });
          }
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
    
    }
    else
    {
      alert("Given Credential is wrong");
    }
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
    setDisabled(false);
   
  };
const loginHandler=()=>{
  navigate("/Login");
}

  return (
    <div className={classes["signup-container"]}>
      <h2 className={classes.title}>Sign Up</h2>

      <form  className = {classes.form} onSubmit={handleSubmit}>
        <div className={classes["form-group"]}>
          <label>Email:</label>
          <input className={classes.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes["form-group"]}>
          <label>Password:</label>
          <input  className={classes.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes["form-group"]}>
          <label>Confirm Password:</label>
          <input  className={classes.input}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button className={classes.signbutton} onClick={handleSubmit} disabled={isdisabled}>Sign Up</button>
        <button className={classes.signbutton} onClick={loginHandler} disabled={isdisabled}>Already have an account</button>
      </form>
    </div>
  );
};

export default SignUp;
