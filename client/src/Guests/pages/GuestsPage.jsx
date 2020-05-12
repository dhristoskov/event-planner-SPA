import React, { Fragment, useReducer, useEffect, useState, useCallback } from 'react';
import axios from '../../axios';

import GuestsForm from '../components/GuestForm';
import GuestsList from '../components/GuestsList';
import Loader from '../../shared/components/Loader/Loader';
import ToggleButton from '../../shared/components/Buttons/ToggleButton';
import Pagination from '../../shared/components/Pagination/Pagination';

const guestsReducer = ( state, action ) => {
    switch(action.type){
        case 'GET':
            return action.guests;
        case 'ADD':
            return [...state, action.guests ]
        case 'DELETE':
            return state.filter(guest => guest.id !== action.id);
        case 'UPDATE_GUEST':
            return state.map(guest => {
                if(guest.id === action.id){ 
                return {
                    ...guest,
                    ...action.update
                }               
            }
            return guest
        });
        case 'CONFIRMED':
            return state.map(guest => guest.id === action.id ? { ...guest, isConfirmed: true}: guest);
        case 'UNCONFIRMED':
            return state.map(guest => guest.id === action.id ? { ...guest, isConfirmed: false}: guest)
        default:
            return state;
    }
};

const GuestsPage = (props) => {

    const [ guests, dispatch ] = useReducer(guestsReducer, []);
    const [ editing, setEditing ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ toggleForm, setToggleFrom ] = useState(false);
    const [ currentPage, setCurrenPage ] = useState(1);
    const itemsPerPage = 5;
    const { eventId } = props

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = guests.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/guests/event/${eventId}`)
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'GET', guests: res.data.guests})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, [eventId]);

    const addGuest = useCallback((guest) => {    
        setIsLoading(true);
        axios.post('/guests', guest, 
        { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'ADD', guests:{id:res.data.guest._id, ...res.data.guest}})
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, []);

    const deleteGuest = useCallback((guestId) => {
        setIsLoading(true);
        axios.delete(`/guests/${guestId}`)
             .then(res => {
                 setIsLoading(false);
                 dispatch({type: 'DELETE', id: guestId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    }, []);

    const confirmedGuest = useCallback((guestId) => {
        setIsLoading(true);
        axios.patch(`/guests/status/${guestId}`, {isConfirmed: true},
                { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type:'CONFIRMED', id: guestId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             });
    }, []);

    const unconfirmedGuest  = useCallback((guestId) => {
        setIsLoading(true);
        axios.patch(`/guests/status/${guestId}`, {isConfirmed: false},
                { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                dispatch({type: 'UNCONFIRMED', id:guestId})
             }).catch(err => {
                setIsLoading(false);
                console.log(err)
             })
    }, []);

    const onEditHandler = useCallback((guestId) => {
        setIsLoading(true);
        axios.get(`/guests/${guestId}`)
             .then(res => {
                setIsLoading(false);
                setToggleFrom(true);
                setEditing(res.data.guest);
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             });
    }, []);

    const onUpdateHandler = useCallback((newGuest) => {
        setIsLoading(true);
        axios.patch(`/guests/${editing.id}`, newGuest,
        { 'Content-Type': 'application/json' })
             .then(res => {
                setIsLoading(false);
                 dispatch({type: 'UPDATE_GUEST', id: editing.id, update: newGuest})
                 setEditing(null);
             }).catch(err => {
                setIsLoading(false);
                console.log(err);
             })
    }, [editing]);

    const onEmailSending = (email) => {
        axios.post('/email/send', email, 
        { 'Content-Type': 'application/json' })
             .then(res => {
             }).catch(err => {
                console.log(err);
             })
    }

    const onToggleForm = () => {
        setToggleFrom(prevState => !prevState);     
    };

    const onPaginationHandler = (number) => {
        setCurrenPage(number);      
    };

    const onClearEditHandler = () => {
        setEditing(null);
    }


    return(
        <div>
                { 
                isLoading ? <Loader /> 
                :
                <Fragment>                                     
                    {
                        ! toggleForm ? 
                        <ToggleButton onToggle={onToggleForm}>Add new Guest</ToggleButton>
                        :
                        <GuestsForm eventId={eventId}
                        addGuest={addGuest}
                        updateGuest={onUpdateHandler}
                        clearEdit={onClearEditHandler}
                        onToggle={onToggleForm} 
                        editing={editing}/>
                    }
                    {
                        guests.length > 0 && 
                        <p className='list-counter'>You have {guests.length} {guests.length === 1 ? 'Guest' : 'Guests'} in your list</p>  
                    }
                    <GuestsList guests={currentItems}
                    delete={deleteGuest}
                    confirmed={confirmedGuest}
                    unconfirmed={unconfirmedGuest}
                    onEditHandler={onEditHandler}
                    onEmailSending={onEmailSending}/>
                     { guests.length > 5 && 
                    <Pagination totalItems={guests.length}
                    itemsPerPage={itemsPerPage}
                    pagination={onPaginationHandler}/>
                    }
                </Fragment>
                }
        </div>
    )
}

export default GuestsPage;