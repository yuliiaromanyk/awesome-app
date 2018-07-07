import React from 'react';
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./../../firebase";
import './profile-page.css';
import App from "./../../App";

const ProfilePage = props => {
    const { user, signOut, error } = props;


    var posts = firebase.database().ref('/users').child(user.uid).child('posts');
    function p(){
        var text = document.getElementById('try').value;
        posts.push({
            name: text
        })

    }
    if (!user) {
        return <App />;
    }
        return(
            <section>
                <header className="profile-cover-section">
                    <h3>My social network</h3>
                    <button onClick={signOut}>Sign Out</button>


                    <button onClick={p}> TEMPLATE</button>
                    <input id="try" />
                </header>
                <main>
                    <div className="user-list">
                    </div>
                    <div className="user-info">
                        <div className="container">
                            <div className="user-info-header">
                                <img src={user.photoURL}/>
                                <div className="info-header-details">
                                    <h4>{user.displayName}</h4>
                                    <ul>
                                        <li>Posts</li>
                                        <li>Followers (23)</li>
                                        <li>Following (4)</li>
                                    </ul>
                                </div>
                            </div>
                        <div className="user-timeline">
                        <div className="timeline-newpost">
                        <input placeholder="What`s new?"/>
                        <button>Post</button>
                        </div>
                        <div className="timeline-allposts">
                            <ul>
                                <li>
                                    <img src={user.photoURL}/>
                                    <div className="timeline-post-text">
                                        <h5>{user.displayName}</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src={user.photoURL}/>
                                    <div className="timeline-post-text">
                                        <h5>{user.displayName}</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </main>
            </section>
        )
}
  
export default ProfilePage;

