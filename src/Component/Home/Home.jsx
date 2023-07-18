import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const api_key = 'AIzaSyDgmSRRfCUQUKwn0F8QuuODw2DaApM3JXw';
    const api_url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`;

    const idToken = localStorage.getItem('idToken'); // Assuming you have stored the ID token in localStorage

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
          setUserDetails(data.users[0]); // Assuming the response contains an array of users and you want to use the first user
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className={classes.homeBody}>
     <div className={classes.HomeHeader}>
  <h1>Welcome to Expense Tracker</h1>
  {userDetails ? (
    <div className={classes.profiledeatils}>
      <img src={userDetails.photoUrl} alt="" className={classes.profileimage} />
      <span className={classes.username}>{userDetails.displayName}</span>
    </div>
  ) : (
    <span>Your Profile is incomplete <Link to="/Profile">Complete now</Link></span>
  )}
</div>

      <Outlet />
    </div>
  );
};

export default Home;
