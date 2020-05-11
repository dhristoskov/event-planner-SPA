import React, { useState } from 'react';

const Reset = (props) => {

    const [ email, setEmail ] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.onPasswordReset(email)
        setEmail('');
    }

    return(
        <div className='auth-container'>
            <p>Reset password</p>
            <form className='auth-form' onSubmit={onSubmitHandler}>
                <input type="email" name='email' value={email} placeholder='Enter e-mail'
                required onChange={(e) => setEmail(e.target.value)}/>
                <input type="submit" value='Reset Password'/>
            </form>
        </div>
        )
}

export default Reset;