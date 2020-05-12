import React, { useState, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiEraserLine } from 'react-icons/ri';

const GuestForm = (props) => {

    const { editing, eventId } = props
    const [newGuest, setNewGuest] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        gender: '',
        isConfirmed: false,
        toEvent: eventId
    });

    useEffect(() => {
        if(editing){
            setNewGuest(editing)
        }else{
            setNewGuest({
                firstName: '',
                lastName: '',
                age: '',
                email: '',
                gender: '',
                isConfirmed: false,
                toEvent: eventId
            });
        }
    }, [editing, eventId]);

    const { firstName, lastName, age, email, gender } = newGuest;

    const onChangeHandler = (e) => {
        setNewGuest({...newGuest, [e.target.name]:e.target.value});
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();  
        if(!editing){
            props.addGuest(newGuest);  
        }else{
            props.updateGuest(newGuest)
        }
        setNewGuest({
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            gender: ''
        });
    }

    return (
        <div className='guest-form-wrapper'>
            {
                editing ? <p className='close-btn' onClick={props.clearEdit}><RiEraserLine /></p>
                : <p className='close-btn' onClick={props.onToggle}><AiOutlineCloseCircle /></p>            
            }
            <h1>{editing ? 'Edit Guest' : 'Add new Guest'}</h1>
            <form className='guest-form' onSubmit={onSubmitHandler}>
                <input type='text' name='firstName' value={firstName} placeholder='First Name'
                required onChange={onChangeHandler} />
                <input type='text' name='lastName' value={lastName} placeholder='Last Name'
                required onChange={onChangeHandler} />
                <input type='email' name='email' value={email} placeholder='Email'
                required onChange={onChangeHandler} />
                <div>
                    <input type='number' name='age' min='10' max='100' value={age} placeholder='Age'
                    required onChange={onChangeHandler} />
                    <div className='guest-radio'>
                        <label htmlFor="male">Male
                        <input type='radio' name='gender' value='male' onChange={onChangeHandler} checked={gender === 'male'}/>
                        </label>
                        <label htmlFor="female">Female
                        <input type='radio' name='gender' value='female' onChange={onChangeHandler} checked={gender === 'female'}/>
                        </label>
                    </div>
                </div>
                <input type='submit' value={editing ? 'Update' : 'Create'}/>
            </form>
        </div>
    )

}

export default GuestForm;
