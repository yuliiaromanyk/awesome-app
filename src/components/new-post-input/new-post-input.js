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
    if (event.key === 'Enter' && event.shiftKey) {
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
        {/* <input type="text"    /> */}
        <textarea id="try" placeholder="What`s new?" onKeyDown={this.add} title="Publish Post Shift + Enter" />
        <button onClick={this.addNewPost}>Post</button>
      </div>
    )
  }
}
