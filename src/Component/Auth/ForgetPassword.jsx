import classes from "./ForgetPassword.module.css"
import React, { useState } from 'react';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendLink = () => {
  
    const API_KEY = 'AIzaSyDgmSRRfCUQUKwn0F8QuuODw2DaApM3JXw';

 
    const requestBody = {
      requestType: 'PASSWORD_RESET',
      email: email,
    };

   
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send password reset link.');
        }
        alert('Password reset link sent successfully.');
      })
      .catch((error) => {
       alert(error);
      });

   
    setEmail('');
  };

  return (
    <div className={classes.forgetContainer}>
        <div className={classes.container}>
        <h2>Send Reset link on your mail</h2>
      <label htmlFor="email" className={classes.label}>Enter your email:</label>
      <input
      className={classes.input}
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Your email address"
      />
      <button onClick={handleSendLink} className={classes.button}>Send Link</button>
        </div>
    </div>
  );
};

export default ForgetPassword;
