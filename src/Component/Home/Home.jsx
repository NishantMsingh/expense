import React from 'react';
import classes from "./Home.module.css";
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
     <div className={classes.homeBody}>
      <div className={classes.HomeHeader}>
      <h1>Welcome to Expense Tracker</h1>
      <span>Your Profile is incompleted <Link to="/Profile">Complete  now</Link></span>
    </div>
    <Outlet/>
     </div>
  
  );
};

export default Home;
