import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <header className="profile-cover-section">
                <h1 className="h3-myProfile">Sharify</h1>
                <button onClick={this.props.signOut}>Sign Out</button>
            </header>
        );
    }
}

export default Header;