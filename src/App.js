import React, { Component } from 'react';
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./firebase";
import Home from "./Home";
import logo from './logo.svg';
import './App.css';
import ProfilePage from './components/profile-page/profile.page';

import PostsPage from './pages/PostsPage/PostsPage';

class App extends Component {
    state = {
      email: `test@test.com`,
      password: `password`
    };
    render() {
      const {
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        user,
        error,
        signOut
      } = this.props;
      const { email, password } = this.state;
      if (user) {
      return <PostsPage user={user} error={error} signOut={signOut} />;
      }
      return (
        <div>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Email"
              onChange={e => this.setState({ email: e.target.value })}
            />{" "}
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <br />
           
            {!user && (
              <button
                type="submit"
                onClick={() => signInWithEmail(email, password)}
              >
                SignIn
              </button>
            )}
          </form>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Email"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
              value={email}
            />{" "}
  
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
              value={password}
            />{" "}
            <br />
            <button
              type="submit"
              onClick={() => signUpWithEmail(email, password)}
            >
              SignUp
            </button>
          </form>
          <br />
          <button onClick={signInWithGoogle}>Signin with Google</button> <br />
      
          <PostsPage />
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
  
