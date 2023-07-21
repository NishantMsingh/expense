import React, { useContext, useEffect, useState } from 'react';
import classes from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../Store/Cart-context';
import DailyExpensesPage from "../Expense/DailyExpensesPage "
import "./Slider.css"
const Home = () => {

  const ctx=useContext(CartContext);
  const navigate=useNavigate();
  const [userDetails, setUserDetails] = useState(null);
 const LogoutHandler=()=>{
   navigate("/Login");
   ctx.logOut();
  alert("Logged out Successfully");

 }
 
  useEffect(() => {
    const api_key = 'AIzaSyDgmSRRfCUQUKwn0F8QuuODw2DaApM3JXw';
    const api_url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`;

    const idToken = localStorage.getItem('idToken'); 

    if (idToken) {
      fetch(api_url, {
        method: 'POST',
        body: JSON.stringify({ idToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          return response.json();
        })
        .then((data) => {
          setUserDetails(data.users[0]); 
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  const premiumHandler =()=>{
ctx.PremiumCall();

  }


  const lightHandler=()=>{
    ctx.callTog();
  }
  return (
    <div className={ctx.toggle ? classes.homeBodyLight :classes.homeBodyDark}>
     <div className={classes.HomeHeader}>
  <h3 className={classes.heading}>Welcome to Expense Tracker {ctx.setPremium &&  <span className={ctx.toggle ? classes.off :classes.on} onClick={lightHandler}>Dark mode off</span>}</h3>
  {userDetails ? (
    <div className={classes.profiledeatils}>
       {ctx.premium&& !ctx.setPremium &&  <span className={classes.premium}onClick={premiumHandler}>Activate the premium</span>}
      <img src={userDetails.photoUrl} alt="/" className={classes.profileimage} />
      <span className={classes.username}>{userDetails.displayName}</span>
    </div>
  ) : (
    <span className={classes.inx}>Your Profile is incomplete <Link to="/Profile">Complete now</Link></span>
  )}

  <span className={classes.logout} onClick={LogoutHandler}>Log out</span>
</div>

<DailyExpensesPage />
    </div>
  );
};

export default Home;
