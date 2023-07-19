import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Component/Auth/SignUp';
import LogIn from './Component/Auth/LogIn';
import Home from './Component/Home/Home';
import Profile from "./Component/Home/Profile/Profile";
import CartContext from './Store/Cart-context';
import ForgetPassword from './Component/Auth/ForgetPassword';


const App = () => {
  const ctx=useContext(CartContext);
  useEffect(()=>{
   let value={
    idToken:localStorage.getItem("idToken"),
    email:localStorage.getItem("email"),
   }
   if(value.idToken)
    {
      ctx.logIn(value);
    }
  })
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/Home" element={<Home />} />    
    <Route path="/Profile" element={<Profile />} /> 
    <Route path="/Signup" element={<SignUp />} />
    <Route path="/ForgetPassword" element={<ForgetPassword />} />
    <Route path="*" element={<LogIn />} />
    </Routes>
  </BrowserRouter>

  );
};

export default App;
