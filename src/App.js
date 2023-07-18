import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Component/Auth/SignUp';
import LogIn from './Component/Auth/LogIn';
import Home from './Component/Auth/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/Home" element={<Home />} />
    
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/Login" element={<LogIn />} />
    
      
    </Routes>
  </BrowserRouter>

  );
};

export default App;
