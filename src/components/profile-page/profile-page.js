import React, { Component } from 'react';
import firebase from "./../../firebase";

//components
import Sidebar from '../Sidebar/Sidebar';
import NewPostInput from '../new-post-input/new-post-input';
import Post from '../Post/Post';
import Header from '../Header/Header';
import Scroll from '../Scroll/Scroll';
import UserInfo from '../UserInfo/UserInfo';

//css
import './profile-page.css';


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


        this.state = {
            user: user,
            loggedUser: user,
            posts: post,
            allUsers: data,
            signOut: signOut,
            error: error,
            content: null,
            postInput: <NewPostInput pushPostToDB={this.addPostToDB} />
        }
    }

    addPostToDB = () => {
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
                user: userInfo,
                posts: newArr,
                postInput: <NewPostInput pushPostToDB={this.addPostToDB} />
            });
        });

    }

    postsClickHandle = () => {
        this.setState({
            content: null
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
                    user: userInfo,
                    posts: newArr,
                    postInput: null
                });
            });

        }
    }

    connectToDB = () => {
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
            <section className="section-profile" id="top">
                <Header signOut={this.state.signOut} />
                <main className="main-profile">
                    <div className="user-info">
                        <div className="container">
                            <UserInfo img={this.state.user.photoURL} userName={this.state.user.displayName}
                                postsClickHandle={this.postsClickHandle} usersClickHandle={this.usersClickHandle} />
                            <div className="user-timeline">
                                <aside className="aside-users">
                                    {this.state.content}
                                </aside>
                                {
                                    this.connectToDB()
                                }
                                <div className="div-post-content">
                                    {this.state.postInput}
                                    <Post user={this.state.user} posts={this.state.posts} />
                                </div>
                            </div>
                        </div>
                        <Scroll />
                    </div>
                </main>
            </section>
        )
    }

}

export default ProfilePage;