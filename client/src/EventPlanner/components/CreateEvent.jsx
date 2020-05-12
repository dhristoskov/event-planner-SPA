import React, { useState,  useContext, useEffect } from 'react';
import { RiEraserLine } from 'react-icons/ri';

import { AuthContext } from '../../shared/contexts/auth-context';

const CreateEvent = (props) => {
    
    const { editing } = props
    const { userId } = useContext(AuthContext);
    const [ event, setEvent ] = useState({
        title: '',
        location: '',
        eventDate: '',
        expGuests: '',
        status: true,
        tasks: [],
        guests: [],
        creator: userId
    });

    useEffect(() => {
        if(editing){
            setEvent({
                title: editing.title,
                location: editing.location,
                eventDate: new Date(editing.eventDate).toISOString().substr(0, 10),
                expGuests: editing.expGuests,
            })
        }else{
            setEvent({
                title: '',
                location: '',
                eventDate: '',
                expGuests: '',
                status: true,
                tasks: [],
                guests: [],
                creator: userId
            });
        }
    }, [editing, userId]);

    const { title, location, eventDate, expGuests } = event;
        
    const onChangeHandler = (e) => {
        setEvent({...event, [e.target.name]: e.target.value});
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!editing){
            props.addEvent(event);
        }else {
            props.updateEvent(event)
        }       
        setEvent({
            title: '',
            location: '',
            eventDate: '',
            expGuests: '',
        })
    }

    return(
        <div className='event-container'>
           { editing && <p className='close-btn' onClick={props.clearEdit}><RiEraserLine /></p>}
            <h1>{editing ? 'Edit Event' : 'Create Event'}</h1>
            <form className='event-form' onSubmit={onSubmitHandler}>
                <input type='text' name='title' value={title} placeholder='Event name'
                required onChange={onChangeHandler}/>
                <input type='text' name='location' value={location} placeholder='Event adress' 
                required onChange={onChangeHandler}/>
                <div>
                    <input type='date' name='eventDate' value={eventDate} placeholder='Enter event date' 
                    required onChange={onChangeHandler}/>
                    <input type='number' name='expGuests' min='0' value={expGuests} placeholder='Expected guests' 
                    required onChange={onChangeHandler}/>
                </div>
                <input type='submit' value={editing ? 'Update' : 'Create'} />
            </form>
        </div>
    )

}

export default CreateEvent;