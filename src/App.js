import React, { Component } from 'react';
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./firebase";
import logo from './logo.png';
import './App.css';
import ProfilePage from './components/profile-page/profile.page';

class App extends Component {
   
    render() {
   
      const {
        signInWithGoogle,
        user,
        error,
        signOut
      } = this.props;
      if (user) {
      return <ProfilePage user={user} error={error} signOut={signOut} />;
      }
      return (
        <div className='main-App'>
        <div className='wrapper-App'>

     <img src={logo}/>
        <div>
        <h3> Hello, I'm a little app </h3>
        <h4>Sign in and see what's inside</h4>
         
          <button className='btn-App' onClick={signInWithGoogle}>Signin with Google</button> 
          </div>

          </div>
        </div>
      );
    }
  }
  
  const authConfig = {
    email: {
      verifyOnSignup: false,
      saveUserInDatabase: true
    },
    google: {
      // scopes: ["admin.datatransfer", "contacts.readonly"], // optional
      // customParams: {
      //   login_hint: "user@example.com"
      // },
      // redirect: true, // default is popup: true, redirect: true,
      returnAccessToken: true,
      // scopes: [], // array
      saveUserInDatabase: true
    },
   
  };
  
  // export default App;
  export default withFirebaseAuth(App, firebase, authConfig);
  
