import React from 'react';
import App from "./../../App";
import '../Post/Post.css';

export default class Post extends React.Component {

  render() {
    console.log(this.props.user);
    return (
      <div className="Post-text">

        <div className="Post-posts">
        <img src={this.props.user.photoURL}/>
        <h4 className="UserName">
        { this.props.user.displayName }
        </h4>
        </div>
        { this.props.post.value }
      </div>
    )
  }
}