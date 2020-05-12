import React from 'react'

const ToggleButton = (props) => {

    return(
        <button className='toggle-btn' onClick={props.onToggle}>
            {props.children}
        </button>
    )
}

export default ToggleButton;