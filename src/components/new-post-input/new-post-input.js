import React from 'react';
import './../new-post-input/new-post-input.css';

export default class NewPostInput extends React.Component {
  addNewPost = () => {
    let inputData = document.getElementById("try").value;
    if (inputData !== "") {
      this.props.pushPostToDB();
      document.getElementById("try").value = "";
    }
  }
  render() {
    return (
          <div className="timeline-newpost">
              <input id="try" placeholder="What`s new?"/>
              <button onClick={this.addNewPost}>Post</button>
          </div>
    )
  }
}
