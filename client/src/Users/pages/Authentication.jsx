import React, { useState, useContext, useCallback, Fragment } from 'react';
import axios from '../../axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Login from '../components/Login';
import Register  from '../components/Register';
import { AuthContext } from '../../shared/contexts/auth-context';
import Loader from '../../shared/components/Loader/Loader';

const Authentication = (props) => {

    const { login } = useContext(AuthContext);
    const [ toggleState, setToggleState ] = useState(false);
    const [isLoading, setIsLoadin] = useState(false);
    const { setShowModal } = props;


    //Post Login
    const onLoginHandler = useCallback((loginUser) => {
        setIsLoadin(true);
        axios.post('/users/login', loginUser,
        {'Content-Type': 'application/json'})
             .then(res => {
                setIsLoadin(false);
                login(res.data.userId, res.data.token, res.data.name);
                setShowModal(false);
             }).catch(err => {
                setIsLoadin(false);
                console.log(err);
             });
    },[login, setShowModal]);


    //Post Register
    const onRegisterHandler = (newUser) => {
        setIsLoadin(true)
        axios.post('/users/register', newUser, 
        {'Content-Type': 'application/json'})
             .then(res => {
                setIsLoadin(false);
                login(res.data.userId, res.data.token, res.data.name);
                setShowModal(false);
             }).catch(err => {
                setIsLoadin(false);
                console.log(err);
             })
    };

    //Post Reset Password
    const onPasswordReset = (email) => {
        axios.post('/email/reset', {email: email}, 
        {'Content-Type': 'application/json'})
             .then(res => {               
                console.log('sent')
             }).catch(err => {
                console.log(err);
             });
    };

    //Toggle between Login and Register Components 
    const toggleAuth = () => {
        setToggleState(prevState => !prevState)
    }

    return(
        <Fragment>
            {
            isLoading 
            ? 
            <Loader /> 
            :
            <div className='authorization'>
                <div className='settings' onClick={toggleAuth}>
                    {toggleState ?  'Move to Login' : 'Move to Register' }
                <span onClick={props.removeModal}><AiOutlineCloseCircle /></span></div>
                <div >
                    {
                        toggleState 
                        ? <Register onRegisterHandler={onRegisterHandler} /> 
                        : <Login onLoginHandler={onLoginHandler} 
                                onPasswordReset={onPasswordReset}/>
                    }
                </div>  
            </div>
            }
        </Fragment>
    )
}

export default Authentication;