import React from 'react';

import NewPostForm from '../../components/NewPostForm/NewPostForm';
import Post from '../../components/Post/Post';

import '../PostsPage/PostsPage.css';

export default class PostsPage extends React.Component {
  state = { posts: [] };
  addPost = (post) => {
    this.setState((state) => ({
      posts: [ ...state.posts, post ]
    }));
  }
  render() {
    return (
      <section>
        <header className="profile-cover-section">
          <h3>My social network</h3>
          <button>Sign Out</button>
        </header>


        <div className="posts-wrapper">
          <div className="posts-list">
              <NewPostForm addPostFn={ this.addPost } />
          </div>
          <div className="posts-list">
              { this.state.posts.map((post, i) => (
                  <Post key={ i } post={ post } />
              ))}
          </div>
        </div>
      </section>
    )
  }
}
