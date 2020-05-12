import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { FcCalendar, FcSmartphoneTablet, FcConferenceCall } from 'react-icons/fc'

import { AuthContext } from '../shared/contexts/auth-context';
import timeOfDay from '../utils/timeOfDay';

const LandingPage = () => {

    const time = timeOfDay();
    const { isLoggedIn, name, userId } = useContext(AuthContext);

    return(
        <div className='background'>
            <div className='site-title'>
                {
                isLoggedIn ? <h1>{time} {name}</h1>
                 : 
                <h1>Welcome to My Event</h1> 
                }
                <p>Easy and simple manage all your events</p>
            </div>
            <section>
                <div className='info-form'>
                    <p>Just Create your Event</p>
                    <i><FcCalendar /></i>
                </div>
                <div className='info-form'>
                    <p>Easily manage every events </p>
                    <i><FcSmartphoneTablet /></i>
                </div>
                <div className='info-form'>
                    <p>Save time and enjoy the event</p>
                    <i><FcConferenceCall /></i>
                </div>
            </section>
            <div className='create-btn'>     
            {
                isLoggedIn 
                ? 
                <NavLink to={`/events/user/${userId}`}><button>Create Event</button></NavLink>
                :
                <NavLink to='/'><button>Create Event</button></NavLink>
            }         
            </div>
        </div>
    )
}

export default LandingPage;