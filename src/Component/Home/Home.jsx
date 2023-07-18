import React, { useContext, useEffect, useState } from 'react';
import classes from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../Store/Cart-context';
import DailyExpensesPage from "../Expense/DailyExpensesPage "
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

  return (
    <div className={classes.homeBody}>
     <div className={classes.HomeHeader}>
  <h3>Welcome to Expense Tracker</h3>
  {userDetails ? (
    <div className={classes.profiledeatils}>
      <img src={userDetails.photoUrl} alt="" className={classes.profileimage} />
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
