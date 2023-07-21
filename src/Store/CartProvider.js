import React, { useState,useEffect } from 'react';
import CartContext from './Cart-context';

const CartProvider = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [token, setToken] = useState(null);
  const [emaill, setEmail] = useState(null);
  const [expense, setExpense] = useState([]);
  const [max, setMax] = useState(0);
  const [pre, setPre] = useState(false);
  const [tog, seTToggle] = useState(false);
  const [Onnoff, seTOnnoff] = useState(false);
  // const [editreq, setEdit] = useState(false);
  // const [editvalue, setEditVal] = useState({});

  const LoginHandler = (value) => {
    setLoginState(true);
    setToken(value.idToken);
    setEmail(value.email);
    localStorage.setItem('idToken', value.idToken);
    localStorage.setItem('email', value.email);
  };
  useEffect(() => {
    if(max>10*1000)
    {
     setPre(true);
   
    }
    else
    {
      setPre(false);
      seTToggle(true);
      seTOnnoff(false);
      localStorage.removeItem("premium");
    }
  }, [max]);

  const LogoutHandler = () => {
    setLoginState(false);
    setToken(null);
    setEmail(null);
    localStorage.removeItem('idToken');
    localStorage.removeItem('email');
  };

  const ExpenseHandler = (data) => {
      setMax((premax)=>{
        return premax+Number(data.amount);
      })
   

    setExpense((prevExpense) => {
      return [...prevExpense, data];
    });
    console.log(expense);
  };

  const ExpenseDeleteHandler = (idx) => {

    let temp = expense.filter((value) => {
      return value.id !== idx.id;
    });
    setExpense(temp);
    setMax((premax)=>{
      return premax-Number(idx.amount);
    })
  
  };
  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("premium"));
    if (x === true) {
      seTOnnoff(true);
    }
  }, []);
  

  const ToggleHandler=()=>{
    seTToggle(!tog);
  }


  const premiumHandler = () => {
    seTOnnoff(true);
    localStorage.setItem("premium", JSON.stringify(true));
  };
  
  const contextValue = {
    idToken: token,
    email: emaill,
    isLoggedin: loginState,
    logIn: LoginHandler,
    logOut: LogoutHandler,
    addItem: ExpenseHandler,
    deleteItem: ExpenseDeleteHandler,
    total:max,
    premium:pre, 
    setPremium:Onnoff,
    PremiumCall:premiumHandler,
    callTog:ToggleHandler,
    toggle:tog,
    
    expenses: expense,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
