import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'

const GuestEmailForm = (props) => {

    const [ email, setEmail ] = useState({
        nameFrom: '',
        message: '',
        email: props.email
    });

    const { nameFrom, message } = email

    const onChangeHandler = (e) => {
        setEmail({...email, [e.target.name]:e.target.value});
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();  
        props.onEmailSending(email)
        setEmail({
            nameFrom: '',
            message: ''
        });
    }

    return (
        <div className='email-container'>
            <p className='settings-btn' onClick={props.removeModal}><AiOutlineCloseCircle /></p>
            <h1>Enter your message</h1>
            <form className='email-form' onSubmit={onSubmitHandler}>
                <input type='text' name='nameFrom' placeholder='Enter your name' value={nameFrom} 
                required onChange={onChangeHandler}/>
                <textarea type='text' name='message' placeholder='Enter your message' value={message} 
                required onChange={onChangeHandler}/>
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default GuestEmailForm;