import React, { Component } from 'react';
import withFirebaseAuth from "react-auth-firebase";
import firebase from "./../../firebase";
import './profile-page.css';
import App from "./../../App";
import Sidebar from '../Sidebar/Sidebar';


class ProfilePage extends Component {

    constructor(props) {
        super(props);
        const { user, signOut, error } = props;

        this.posts = firebase.database().ref('/users').child(user.uid).child('posts');

        if (!user) {
            return <App />;
        }

        let data = [];
        var usersRef = firebase.database().ref('/users');
        usersRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                data.push(childData);
                console.log(childData);
                
            });
        });

        this.state = {
            user: user, //data to display user can be changed
            loggedUser: user, // Save data about logged user DONT CHANGE!!!
            allUsers: data, //Data about all users
            signOut: signOut,
            error: error,
            content: null //users sidebar
        }

    }

    //render post logic if loggedUser id != user id hide component like sidebar else show 
    //render post should work as separate component and should take user as a props
    // if everything done well hould work like photo and username change
    // dont add liseners to change users

    p = () => {
        let text = document.getElementById('try').value;
        this.posts.push({
            name: text
        })

    }

    showLoggedUser = () =>{
        this.setState({
            user: this.state.loggedUser //returns to logged user page by cliking on sites logo
        });
    }

    postsClickHandle = () => {
        this.setState({
            content: null //disables sidebar
        });
    }

    usersClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} showUser={this.showAnoterUserInfo} title="All Users"/>
        });
    }

    followersClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} showUser={this.showAnoterUserInfo} title="Followers"/> //add followers
        });
    }

    followingClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} showUser={this.showAnoterUserInfo} title="Followings"/> //add followings
        });
    }

    showAnoterUserInfo = (userInfo) => {
        this.setState({
            user: userInfo //changes user data to display for detail watch user component
        });
    }

    render() {
        return (
            <section className="section-profile">
            <header className="profile-cover-section">
                <h3 onClick={this.showLoggedUser}>My social network</h3>
                <button onClick={this.state.signOut}>Sign Out</button>


                <button onClick={this.p}> TEMPLATE</button>
                <input id="try" />
            </header>
            <main className="main-profile">
                <div className="user-info">
                    <div className="container">
                        <div className="user-info-header">
                            <img src={this.state.user.photoURL}/>
                            <div className="info-header-details">
                                <h4>{this.state.user.displayName}</h4>
                                <ul>
                                    <li onClick={this.postsClickHandle} className="li-navigation">Posts</li>
                                    <li onClick={this.usersClickHandle} className="li-navigation">All Users</li>
                                    <li onClick={this.followersClickHandle} className="li-navigation">Followers</li>
                                    <li onClick={this.followingClickHandle} className="li-navigation">Following</li>
                                </ul>
                            </div>
                        </div>
                        <div className="user-timeline">
                            <aside className="aside-users">
                                {this.state.content}
                            </aside>
                            <div className="div-post-content">
                                <div className="timeline-newpost">
                                    <input placeholder="What`s new?"/>
                                    <button>Post</button>
                                </div>
                                <div className="timeline-allposts">
                                    <ul>
                                        <li>
                                            <img src={this.state.user.photoURL}/>
                                            <div className="timeline-post-text">
                                                <h5>{this.state.user.displayName}</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <img src={this.state.user.photoURL}/>
                                            <div className="timeline-post-text">
                                                <h5>{this.state.user.displayName}</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        )
    }

}

export default ProfilePage;
