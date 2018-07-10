import React, { Component } from 'react';
import './UserInfo.css';

class UserInfo extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="user-info-header">
                <img src={this.props.img} />
                <div className="info-header-details">
                    <h4>{this.props.userName}</h4>
                    <ul>
                    <li onClick={this.props.postsClickHandle} className="li-navigation">Posts <i className="far fa-edit"></i></li>
                    <li onClick={this.props.usersClickHandle} className="li-navigation">All Users <i className="fas fa-user-friends"></i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserInfo;