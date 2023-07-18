import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Component/Auth/SignUp';
import LogIn from './Component/Auth/LogIn';
import Home from './Component/Home/Home';
import Profile from "./Component/Home/Profile/Profile";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/Profile" element={<Profile />} /> 
    <Route path="/Signup" element={<SignUp />} />
    <Route path="*" element={<LogIn />} />
    </Routes>
  </BrowserRouter>

  );
};

export default App;
