import React, {
    Component
}
from 'react';
import './Users.css';

class Users extends Component {

    constructor(props) {
        super(props);
    }

    renderUsers() {
        return this.props.users.map((item, index) => (
            <li className="div-users_list" key={index} onClick={() => this.props.showUser(item)}>
                <img src={item.photoURL} alt="User Name" className="img-user"/>
                <p className="p-userName">{item.displayName}</p>
                <button className="follow-btn">follow +</button>
            </li>
        ));
    }

    render() {
        return (
            <ul> 
                {
                    this.renderUsers()
                }
            </ul>
        );
    }
}

export default Users;
