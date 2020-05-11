import React, { useState } from 'react';

import PasswordField from './PasswordField';
import timeOfDay from '../../utils/timeOfDay';

const Register = (props) => {

    const time = timeOfDay();
    const [ register, setRegister ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = register;
        
    const onChangeHandler = (e) => {
        setRegister({...register, [e.target.name]: e.target.value});
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(register.password !== register.password2){
            console.log('Passowrds does not much')
        }
        props.onRegisterHandler(register)
        setRegister({
            name: '',
            email: '',
            password: '',
            password2: ''
        })
    }


    return (
        <div className='auth-container'>
            <h1>{ time }</h1>
            <p>Before using our app, you need to create an account</p>
            <form className='auth-form' onSubmit={onSubmitHandler}>
                <input type='text' name='name' value={name} placeholder='Name...'
                required onChange={onChangeHandler} />
                <input type="email" name='email' value={email} placeholder='E-mail...' 
                required onChange={onChangeHandler}/>
                <PasswordField password={password} onChangeHandler={onChangeHandler} />
                <input type="password" name='password2' value={password2} placeholder='Confirm password...' 
                required onChange={onChangeHandler}/>
                <input type="submit" value='Submit'/>
            </form>
        </div>
    )
}

export default Register;