import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdDashboard, MdAccountBox, MdContacts } from 'react-icons/md'
import { AuthContext } from '../../contexts/auth-context';

const SideBar = () => {

    const { userId } = useContext(AuthContext);

    return (
        <ul className='sidebar-nav'>
            <li><NavLink exact to='/'><MdHome /></NavLink></li>
            <li><NavLink to={`/events/user/${userId}`}><MdDashboard /></NavLink></li>
            <li><NavLink to='/account'><MdAccountBox /></NavLink></li>
            <li><NavLink to='/contacts'><MdContacts /></NavLink></li>
        </ul>
    )

}

export default SideBar;