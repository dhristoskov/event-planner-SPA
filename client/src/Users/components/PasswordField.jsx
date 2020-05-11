import React, { useState } from 'react';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md'


const PasswordField = (props) => {

    const [ unVisible, setUnVisible ] = useState(true);

    const toggleVisibal = () => {
        setUnVisible(prevState => !prevState);
    }

    return (
        <div className='toggleVisibal'>
            <input type={unVisible ? 'password':'text'} name='password' value={props.password}
             onChange={props.onChangeHandler} placeholder='Enter password' required/>
            <span onClick={toggleVisibal}>{unVisible ? <i className='iconVisibility'><MdVisibilityOff /></i> : 
            <i className='iconVisibility'><MdVisibility  /></i> }</span>
        </div>
    )
}

export default PasswordField;