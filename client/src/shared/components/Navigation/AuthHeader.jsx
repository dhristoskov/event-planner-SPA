import React, { useContext } from 'react';

import { AuthContext } from '../../contexts/auth-context';
import timeOfDay from '../../../utils/timeOfDay';

const AuthHeader = () => {

    const { name } = useContext(AuthContext);
    const time = timeOfDay();

    return(
        <div className='auth-header'>
            <p><span>{time}</span>, {name}</p>
        </div>
    )
}

export default AuthHeader