import React from 'react';
import './Post.css';

export default class Post extends React.Component {

  renderPosts = () => {
    return this.props.posts.map((item, index) => (
      <li className="post-data" key={index}>
        <img src={this.props.user.photoURL} alt="User Name" />
        <div className="timeline-post-text">
          <h5>{this.props.user.displayName}</h5>
          <p>{item.name}</p>
          <span className="post-date">{item.dateNote}</span>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <ul>
        {
          this.renderPosts()
        }
      </ul>
    )
  }
}