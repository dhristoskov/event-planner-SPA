import React, { useState } from 'react';

import PasswordField from './PasswordField';

const ResetForm = () => {

    const [reset, setReset ] = useState({
        password: '',
        password2: ''
    })

    const { password, password2 } = reset;

    const onChangeHandler = (e) => {
        setReset({...reset, [e.target.name]: e.target.value});
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(reset.password !== reset.password2){
            console.log('Passowrds does not much')
        }
        setReset({
            password: '',
            password2: ''
        })
    }

    return(
            <div className='reset-container'>
                <p>Reset your Password with a new one</p>
                <form className='reset-form' onSubmit={onSubmitHandler}>
                    <PasswordField password={password} onChangeHandler={onChangeHandler} />
                    <input type="password" name='password2' value={password2} placeholder='Confirm password...' 
                    required onChange={onChangeHandler}/>
                    <input type="submit" value='Submit'/>
                </form>
            </div>
        )
}

export default ResetForm;