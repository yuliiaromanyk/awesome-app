import React from 'react';
import './Post.css';

export default class Post extends React.Component {

  renderPosts = () => {
    return this.props.posts.map((item, index) => (
      <li className="post-data" key={index}>
        <img src={this.props.user.photoURL} alt="User Name" />
        <div className="timeline-post-text">
          <h5>{this.props.user.displayName}</h5>
          {this.complex(item.name)}
          <span className="post-date">{item.dateNote}</span>
        </div>
      </li>
    ));
  }

  complex(str) {
    let arr = str.split("\n");
    return arr.map(item =>
      (
        <p>
          {item}<br />
        </p>
      ))
  }

  render() {
    return (
      <div className="timeline-allposts">
        <ul>
          {
            this.renderPosts()
          }
        </ul>
      </div>
    )
  }
}