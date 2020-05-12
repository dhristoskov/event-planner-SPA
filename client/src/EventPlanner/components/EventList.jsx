import React from 'react';

import EventSingleItem from './EventSingleItem';
import Card from '../../assets/Card.svg'

const EventList = (props) => {

    
    if(!props.events.length) {
        return(
                <div className='empty-event'>
                    <p>Your Event List is empty </p>
                    <p className='line'/>
                    <img src={Card} alt='empty-card' />
                </div>  

            )   
       }
   

    return(
        <ul>
            {props.events.map(event => {
                return (
                    <EventSingleItem key={event.id}
                    title={event.title}
                    location={event.location}
                    expGuests={event.expGuests}
                    eventDate={event.eventDate}
                    status={event.status}
                    guests={event.guests}
                    onEventCancel={() => props.onEventCancel(event.id)}
                    onEventOpen={() => props.onEventOpen(event.id)}
                    delete={() => props.delete(event.id)}
                    selectEvent={() => props.selectEvent(event.id)}
                    onEditHandler={() => props.onEditHandler(event.id)}/>
                )
            })}
        </ul>       
    )
}

export default EventList;