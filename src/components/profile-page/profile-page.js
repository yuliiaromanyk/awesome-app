import React, { Component } from 'react';
import firebase from "./../../firebase";
import './profile-page.css';
import App from "./../../App";
import Sidebar from '../Sidebar/Sidebar';
import NewPostInput from './../new-post-input/new-post-input';
import Post from './../Post/Post';

class ProfilePage extends Component {


    constructor(props) {
        super(props);
        const { user, signOut, error } = props;

        let data = [];
        let post = [];

        this.postsRef = firebase.database().ref('/users').child(user.uid).child('posts');
        let usersRef = firebase.database().ref('/users');

        usersRef.once('value', function (snapshot) { //не міняти once !!!!
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                data.push(childData);
            });
        });

        this.postsRef.once('value', function (snapshot) {  //не міняти once !!!!
            snapshot.forEach(function (childSnapshot) {
                let postItem = childSnapshot.val();
                post.unshift(postItem);
            });
        });

        this.state = {
            user: user, //data to display user can be changed
            loggedUser: user, // Save data about logged user DONT CHANGE!!!
            posts: post,
            allUsers: data,//Data about all users
            signOut: signOut,
            error: error,
            content: null, //users sidebar
            postInput: <NewPostInput pushPostToDB={this.p} />
        }
    }

    //render post logic if loggedUser id != user id hide component like sidebar else show 
    //render post should work as separate component and should take user as a props
    // if everything done well hould work like photo and username change
    // dont add liseners to change users

    p = () => {
        let currentdate = new Date();
        let datetime = + currentdate.getDate() + "/" + (parseInt(currentdate.getMonth()) + 1)
            + "/" + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        let noteText = document.getElementById('try').value;

        let newPost = {
            name: noteText,
            author: this.state.user.displayName,
            dateNote: datetime
        }

        this.postsRef.push(newPost);

        this.setState({
            posts: [newPost, ...this.state.posts]
        });
    }

    showLoggedUser = (userInfo) => {

        let newArr = [];
        this.postsRef.once('value', function (snapshot) {   //не міняти once !!!!
            snapshot.forEach(function (childSnapshot) {
                let postItem = childSnapshot.val();
                newArr.unshift(postItem);
            });
        }).then(() => {
            this.setState({
                user: userInfo, //changes user data to display for detail watch user component
                posts: newArr,
                postInput: <NewPostInput pushPostToDB={this.p} />
            });
        });

    }

    postsClickHandle = () => {
        this.setState({
            content: null //disables sidebar
        });
    }

    usersClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} showUser={this.showAnoterUserInfo} title="All Users" />
        });
    }


    showAnoterUserInfo = (userInfo) => {
        if (userInfo.uid === this.state.loggedUser.uid) {
            this.showLoggedUser(userInfo)
        } else {
            let newArr = [];
            firebase.database().ref('/users').child(userInfo.uid).child('posts').once('value', function (snapshot) {   //не міняти once !!!!
                snapshot.forEach(function (childSnapshot) {
                    let postItem = childSnapshot.val();
                    newArr.unshift(postItem);
                });
            }).then(() => {
                this.setState({
                    user: userInfo, //changes user data to display for detail watch user component
                    posts: newArr,
                    postInput: null
                });
            });

        }
    }

    renderPosts = () => {
        if (this.state.posts.length === 0) {
            let newArr = [];
            this.postsRef.once('value', function (snapshot) {   //не міняти once !!!!
                snapshot.forEach(function (childSnapshot) {
                    let postItem = childSnapshot.val();
                    newArr.unshift(postItem);
                });
            }).then(() => {
                this.setState({
                    posts: newArr
                });
            });
        }
    }

    render() {
        return (
            <section className="section-profile">
                <header className="profile-cover-section">
                    <h3 className="h3-myProfile">My profile</h3>
                    <button onClick={this.state.signOut}>Sign Out</button>

                </header>
                <main className="main-profile">
                    <div className="user-info">
                        <div className="container">
                            <div className="user-info-header">
                                <img src={this.state.user.photoURL} />
                                <div className="info-header-details">
                                    <h4>{this.state.user.displayName}</h4>
                                    <ul>
                                        <li onClick={this.postsClickHandle} className="li-navigation">Posts</li>
                                        <li onClick={this.usersClickHandle} className="li-navigation">All Users</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="user-timeline">
                                <aside className="aside-users">
                                    {this.state.content}
                                </aside>
                                {
                                    this.renderPosts()
                                }
                                <div className="div-post-content">
                                    {this.state.postInput}
                                    <div className="timeline-allposts">
                                        <Post user={this.state.user} posts={this.state.posts} />
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
