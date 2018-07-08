import React from 'react';
import '../post/post.css';

export default class Post extends React.Component {
  render() {
    return (
      <li className="post-data">
        <img src={this.props.user.photoURL}/>
        <div className="timeline-post-text">
            <h5>{this.props.user.displayName}</h5>
            <p>{this.props.post.name}</p>
            <span className="post-date">{this.props.post.dateNote}</span>
        </div>
      </li>
    )
  }
}