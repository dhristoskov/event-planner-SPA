import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from '../../axios';

import TodoPage from '../../ToDoList/pages/TodoPage';
import GuestsPage from '../../Guests/pages/GuestsPage';
import Layout from '../../shared/components/Layout/EventLayout';
import EventDetailInfo from '../components/EventDetailInfo';
import Loader from '../../shared/components/Loader/Loader';

const EventElementsPage = () => {

    const eventId = useParams().id
    const history = useHistory()
    const [ isLoading, setIsLoading ] = useState(false);
    const [ event, setEvent ] = useState({});

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/events/${eventId}`)
             .then(res => {
                setIsLoading(false);
                setEvent(res.data.event)
             }).catch(err => {
                 setIsLoading(false);
                console.log(err)
             });
    }, [eventId])

    const backToEventList = () => {
        history.goBack()
    }
    

    return(
            <div className='background'>
                {
                    isLoading ? <Loader /> 
                    : 
                    <EventDetailInfo title={event.title}
                    location={event.location}
                    eventDate={event.eventDate}
                    status={event.status}
                    goBack={backToEventList}/>              
                }
                <Layout>
                    <TodoPage eventId={eventId} />
                    <GuestsPage eventId={eventId} />       
                </Layout>
            </div>
    )
}

export default EventElementsPage;
