import React, { Component } from 'react';

import Users from './Users/Users'

import './Sidebar.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="div-users">
        <nav className="nav-users">
          <h3 id="li-allUsers" className="nav-item text-Highlight">{this.props.title}</h3>
        </nav>
        <div>
            {
              <Users users={this.props.users}/>
            }
        </div>
      </div>
    );
  }
}

export default App;
