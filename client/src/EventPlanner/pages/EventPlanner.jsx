import React, { useReducer, useEffect, useState, Fragment, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from '../../axios';

import EventList from '../components/EventList';
import CreateEvent from '../components/CreateEvent';
import EventLayout from '../../shared/components/Layout/EventLayout';
import Loader from '../../shared/components/Loader/Loader';

const eventReducer = ( state, action ) => {
    switch(action.type){
        case 'GET':
            return action.events;
        case 'ADD':
            return [...state, action.events ]
        case 'DELETE':
            return state.filter(event => event.id !== action.id);
        case 'UPDATE_EVENT':
                return state.map(event => {
                    if(event.id === action.id){ 
                    return {
                        ...event,
                        ...action.update
                    }               
                }
                return event
        });
        case 'STATUS_CANCELED':
            return state.map(event => event.id === action.id ? { ...event, status: false} : event)
        case 'STATUS_OPEN':
                return state.map(event => event.id === action.id ? { ...event, status: true} : event)
        default:
            return state;
    }
};


const EventPlanner = () => {

    const history = useHistory()
    const [ isLoading, setIsLoading ] = useState(false);
    const [ editing, setEditing ] = useState();
    const [ events, dispatch ] = useReducer(eventReducer, []);
    const userId = useParams().id;


    //Get events by User ID
    useEffect(() => {
        setIsLoading(true);
        axios.get(`/events/user/${userId}`)
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'GET', events: res.data.events})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, [userId]);
  

    //Add new Event
    const addNewEvent = useCallback((event) => {
        setIsLoading(true);
        axios.post('/events', event, 
        { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'ADD', events:{id:res.data.event._id, ...res.data.event}})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, []);


    //Delete Event
    const deleteEvent = useCallback((eventId) => {
        setIsLoading(true);
        axios.delete(`/events/${eventId}`)
             .then(res => {
                 setIsLoading(false);
                 dispatch({type: 'DELETE', id: eventId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    }, []);

    //Change Event Status to false
    const onEventCancel = useCallback((eventId) => {
        setIsLoading(true);
        axios.patch(`/events/status/${eventId}`, {status: false},
                { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type:'STATUS_CANCELED', id: eventId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             })    
    }, []);

    //Change Event status to true
    const onEventOpen = useCallback((eventId) => {
        setIsLoading(true);
        axios.patch(`/events/status/${eventId}`, {status: true},
                { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type:'STATUS_OPEN', id: eventId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });     
    }, []);

    //Get single Event item
    const onEditHandler = useCallback((eventId) => {
        setIsLoading(true);
        axios.get(`/events/${eventId}`)
             .then(res => {
                setIsLoading(false);
                setEditing(res.data.event);               
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             });
    }, []);

    //Update Event
    const onUpdateHandler = useCallback((newEvent) => {
        setIsLoading(true);
        axios.patch(`/events/${editing.id}`, newEvent,
        { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'UPDATE_EVENT', id: editing.id, update: newEvent})
                setEditing(null);
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, [editing]);


    //Get ID for the Event
    const selectEventHandler = (id) => {
        history.push(`/event/${id}`)
    };

    const onClearEditHandler = () => {
        setEditing(null);
    };

    return(
        <div className='background'>
            <EventLayout>
                {
                    isLoading ? <Loader />
                    :
                    <Fragment>
                        <EventList events={events} 
                            onEventCancel={onEventCancel}
                            onEventOpen={onEventOpen}
                            delete={deleteEvent}
                            selectEvent={selectEventHandler}
                            onEditHandler={onEditHandler}/>
                        <CreateEvent addEvent={addNewEvent}                           
                            updateEvent={onUpdateHandler}
                            clearEdit={onClearEditHandler}
                            editing={editing}/>
                    </Fragment>
                }
            </EventLayout>
        </div>
    )
}

export default EventPlanner