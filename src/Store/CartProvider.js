import React, { useState } from 'react'
import CartContext from "./Cart-context";
const CartProvider = (props) => {
const[loginState,setLoginState]=useState(false);
const[token,setToken]=useState(null);
const[emaill,setEmail]=useState(null);

const LoginHandler=(value)=>{
    setLoginState(true);
    setToken(value.idToken);
    setEmail(value.email);
    localStorage.setItem("idToken",value.idToken);
    localStorage.setItem("email",value.email);
}
const LogoutHandler=()=>{
    setLoginState(false);
    setToken(null);
    setEmail(null);
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
}
const contextValue={
    idToken:token,
    email:emaill,
    isLoggedin:loginState,
    logIn:LoginHandler,
    logOut:LogoutHandler
}




    return (
        <CartContext.Provider value={contextValue}>
          {props.children}
        </CartContext.Provider>
      );
    };
    
    export default CartProvider;



