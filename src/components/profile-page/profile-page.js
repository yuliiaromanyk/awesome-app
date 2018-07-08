import React, { Component } from 'react';
import firebase from "./../../firebase";
import './profile-page.css';
import App from "./../../App";
import Sidebar from '../Sidebar/Sidebar';
import NewPostInput from './../new-post-input/new-post-input';
import Post from './../post/post';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        const { user, signOut, error } = props;
        
        this.postsRef = firebase.database().ref('/users').child(user.uid).child('posts');

        let data = [];
        let post = [];
        
        var usersRef = firebase.database().ref('/users');
        
        usersRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                data.push(childData);
            });
        });
        
        this.postsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var postItem = childSnapshot.val();
                post.push(postItem);
            });
        });

        this.state = {
            user: user,
            posts: post,
            allUsers: data,
            signOut: signOut,
            error: error,
            content: null
        } 
          
    }

    p = () => {        
        let currentdate = new Date(); 
        let datetime =  + currentdate.getDate() + "/"+  (parseInt(currentdate.getMonth()) + 1)
            + "/" + currentdate.getFullYear()   + " "
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
            posts: [newPost , ...this.state.posts]
        });
    }

    postsClickHandle = () => {        
        this.setState({
            content: null
        });
    }

    usersClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} title="All Users"/>
        });
    }

    followersClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} title="Followers"/> //add followers
        });
    }

    followingClickHandle = () => {
        this.setState({
            content: <Sidebar curUsers={this.state.user} users={this.state.allUsers} title="Followings"/> //add followings
        });
    }

    render() {
        return (
            <section className="section-profile">
            <header className="profile-cover-section">
                <h3>My social network</h3>
                <button onClick={this.state.signOut}>Sign Out</button>

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

                                <NewPostInput pushPostToDB={this.p}/>
                                <div className="timeline-allposts">
                                    <ul>
                                        {this.state.posts.map((post, i) => (
                                            <Post key={i} user={this.props.user} post={post} />
                                        ))}
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
