import React from 'react';

import '../NewPostForm/NewPostForm.css';

export default class NewPostForm extends React.Component {
  addNewPost = () => {
    if (this.state.value) {
      this.props.addPostFn({ value: this.state.value });
      this.setState((state) => ({ value: '' }));
    }
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState((state) => ({
      value: value
    }));
  }
  render() {
    return (
      <div className="NewPostForm-newPost">
        <textarea className="NewPostForm-textline"
          placeholder="New post"
          maxLength="200"
          onChange={ this.handleChange }
        />

        <button onClick={ this.addNewPost }>
          POST
        </button>
      </div>
    )
  }
}
