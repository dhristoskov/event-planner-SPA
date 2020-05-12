import React from 'react';

const Button = (props) => {

    return(
        <button className='button-primary'
        onClick={props.clickIt}>
            {props.children}
        </button>
    )
}

export default Button;