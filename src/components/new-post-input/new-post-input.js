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

  add = (event) => {
    if (event.keyCode === 13) {
      let inputData = document.getElementById("try").value;
      if (inputData !== "") {
        this.props.pushPostToDB();
        document.getElementById("try").value = "";
      }
    }
  }

  render() {
    return (
      <div className="timeline-newpost">
        <input type="text" id="try" placeholder="What`s new?" onKeyDown={this.add} />
        <button onClick={this.addNewPost}>Post</button>
      </div>
    )
  }
}
