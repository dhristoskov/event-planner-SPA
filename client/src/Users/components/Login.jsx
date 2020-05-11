import React, { useState, Fragment } from 'react';

import PasswordField from './PasswordField';
import Reset from './Reset';
import timeOfDay from '../../utils/timeOfDay';

const Login  = (props) => {

    const time = timeOfDay();
    const [ reset ,setReset ] = useState(false);
    const [ login, setLogin ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = login;
        
    const onChangeHandler = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.onLoginHandler(login)
        setLogin({
            email: '',
            password: ''
        })
    }

    const onResetHandler = () => {
        setReset(true)
    }

    let loginState;
    if(!reset){
        loginState = (
            <div className='auth-container'>
                <h1>{ time }</h1>
                <p>enter your credentials to log-in</p>
                <form className='auth-form' onSubmit={onSubmitHandler}>
                    <input type="email" name='email' value={email} placeholder='Enter e-mail'
                    required onChange={onChangeHandler}/>
                    <PasswordField password={password} onChangeHandler={onChangeHandler} />
                    <input type="submit" value='Submit'/>
                </form>
                <p className='psw-question' onClick={onResetHandler}>Forgotten password?</p>
            </div>
        )
    }else{
        loginState = <Reset onPasswordReset={props.onPasswordReset}/>
    }


    return(
        <Fragment>
            {loginState}
        </Fragment>
        )
}

export default Login;