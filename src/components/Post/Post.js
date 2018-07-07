import React from 'react';

import '../Post/Post.css';

export default class Post extends React.Component {
  render() {
    return (
      <div className="Post-text">
        <h4 className="UserName">
          Name
        </h4>
        { this.props.post.value }
      </div>
    )
  }
}