import React, { useState, Fragment, useContext }  from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai'

import Modal from '../../shared/components/Modals/Modal';
import { timeCountDown } from '../../utils/timeCountDown';
import DeleteWarning from '../../shared/components/DeleteWarning/DeleteWarning';
import { ThemeContext } from '../../shared/contexts/theme-context';


const EventSingleItem = (props) => {

    const [showWarning, setShowWarning ] = useState(false);
    const { theme } = useContext(ThemeContext)

    let date = new Date(props.eventDate).toLocaleDateString('de-DE');
    const left = timeCountDown(props.eventDate);

    if( left.total <= 0 ){
        left.days = 0;
        left.hours = 0; 
    }
    
    const showDeleteWarning = () => {
        setShowWarning(true);
    }

    const hideDeleteWarning = () => {
        setShowWarning(false);
    }


    return(
        <Fragment>
            {
            showWarning &&   
            <Modal removeModal={hideDeleteWarning}>
                <DeleteWarning 
                delete={props.delete}
                cancel={hideDeleteWarning}/>
            </Modal>
            }
            <div style={theme} className='event-card'>
                <h3>{props.title}</h3>
                <div className='card-info' >
                    <p>Date: <span>{date}</span></p>
                    <p>Location: <span>{props.location}</span></p>
                </div>
                <div className='card-info-middle'>
                    <p>Guests: <span>{props.guests.length}/{props.expGuests}</span></p>
                    {!props.status ? 
                        <button className='status-close' onClick={props.onEventOpen}>Status: CLOSED</button> :
                        <button className='status-opne'onClick={props.onEventCancel}>Status: OPEN</button>      
                    }
                </div>
                <div className='card-info-middle'>
                    <p>Menu: <span>Avaliable</span></p>
                <p>Time Left: <span>{left.days} {left.days > 1 ? 'days' : 'day'}-{left.hours} {left.hours > 1 ? 'hours' : 'hour'}</span> </p>
                </div>
                <div className='card-btns'>
                    <button onClick={showDeleteWarning}>Delete</button>
                    <button onClick={props.onEditHandler}>Edit</button>
                </div>
                <div className='event-title' onClick={props.selectEvent}>
                <AiOutlineInfoCircle /><span>more</span></div>
            </div>
        </Fragment>
    )
}

export default EventSingleItem;