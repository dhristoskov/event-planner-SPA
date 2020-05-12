import React from 'react' 

import GuestSingleItem from './GuestSingleItem';

const GuestsList = (props) => {

    if(!props.guests.length) {
        return(
                <div className='empty-event'>
                    <p>Your Guest List is empty </p>
                    <p className='line'/>
                </div>  

            )   
    }

    return(
        <ul>
            {
                props.guests.map(guest => {
                    return(
                        <GuestSingleItem  key={guest.id}
                        firstName={guest.firstName}
                        lastName={guest.lastName}
                        gender={guest.gender}
                        isConfirmed={guest.isConfirmed}
                        age={guest.age}
                        email={guest.email}
                        delete={() => props.delete(guest.id)}
                        confirmed={() => props.confirmed(guest.id)}
                        unconfirmed={() => props.unconfirmed(guest.id)}
                        edit={() => props.onEditHandler(guest.id)}
                        onEmailSending={props.onEmailSending}/>
                    )
                })
            }
        </ul>
    )
}

export default GuestsList;