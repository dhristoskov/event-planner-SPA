import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi'

import {timeCountDown} from '../../utils/timeCountDown';

const EventDetailInfo = (props) => {

    let date = new Date(props.eventDate).toLocaleDateString('de-DE');
    const left = timeCountDown(props.eventDate);

    return(
        <div className='event-single-wrapper'>
            <p className='back-icon' onClick={props.goBack}><FiArrowLeftCircle /><span>Back</span></p>
            <h1>{props.title}</h1>
            <h3>location: <span>{props.location}</span></h3>
            <div className='more-info'>
                <p>Event Date: <span>{date}</span></p>
                <p>Time Left: <span>{left.days} {left.days > 1 ? 'days' : 'day'}-{left.hours} {left.hours > 1 ? 'hours' : 'hour'}</span> </p>                 
                <p> Event status: 
                    {
                        props.status ? 
                        <span style={{color:'green'}}> OPEN</span> : 
                        <span style={{color: 'red'}}> CLOSED</span>
                    }
                </p>                       
            </div>
        </div>
    )
}

export default EventDetailInfo;