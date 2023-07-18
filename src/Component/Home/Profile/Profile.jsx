import React,{useState} from 'react'
import classes from "./Profile.module.css"
import { Link } from 'react-router-dom';
import { AiOutlineGithub } from "react-icons/ai";
import { VscCloudUpload } from "react-icons/vsc";

const Profile = () => {
let api_url="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDgmSRRfCUQUKwn0F8QuuODw2DaApM3JXw";
 const [name,setName]=useState("");
 const [url,setUrl]=useState("");

const nameChange=(e)=>{
setName(e.target.value);
}
const urlChange=(e)=>{
setUrl(e.target.value);
}


 const submitHandler=(e)=>
  {
    e.preventDefault();
    let obj={
      idToken:localStorage.getItem("idToken"),
      displayName:name,
      photoUrl:url,
      returnSecureToken:true
    }
    try {
      fetch(api_url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } 
          else {
            alert('Profile updation failed');
          }
        })
        .then((data) => {
          alert("Data Submitted successfully");
          console.log(data);
        })
        .catch((e) => {
          // Catch the error and handle it appropriately
          alert('Profile updation failed');
        });
    } catch (e) {
      // This catch block will not catch fetch errors; it will only catch syntax errors in the try block
      alert('Profile updation failed');
    }
    setName("");
    setUrl("");
    
    
   
  }
  return (
    <div className={classes.profileBody}>
        <div className={classes.profile}>
          <span className={classes.quote}>Winners Never GiveUP</span>
          <span className={classes.incomplete}>You Profile is <code>68%</code> completed   <br /><Link to="/Profile" className={classes.link}>Complete now</Link></span>
        </div>

        <div className={classes.fromContainer}>
           <div className={classes.formHeader}>
              <span className={classes.formHeading}>Contact details</span>
              <span className={classes.cancel}><Link to="/Home">X</Link></span>
           </div>
           <form onSubmit={submitHandler}>
              <div className={classes.formGroup}>
              <AiOutlineGithub/> <label htmlFor="">Full Name : </label>
              <input type="text"  onChange={nameChange}/>
              </div> 
              <div className={classes.formGroup}>
              <VscCloudUpload/> <label htmlFor="url">Profile photo url </label>
              <input type="url" name="url" id="url" onChange={urlChange}/>
              </div>
              <button type='submit' className={classes.update}>Update</button>
           </form>
        </div>
    </div>
  )
}

export default Profile;
