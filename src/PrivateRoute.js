import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import CartContext from './Store/Cart-context';
import Home from './Component/Home/Home';
const PrivateRoute = ({ path, element }) => {
  const ctx = useContext(CartContext);

  return ctx.isLoggedin ? (
    <Route path="/Home" element={<Home/>} />
  ) : (
    <Navigate to="/Login" replace />
  );
};

export default PrivateRoute;
