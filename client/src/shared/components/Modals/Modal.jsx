import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';

const AuthModal = (props) => {

    return (
        <Fragment>
            <Backdrop removeModal={props.removeModal}/>
            <div className='auth-modal'>
                {props.children}
            </div>
        </Fragment>
    )
}

export default AuthModal;