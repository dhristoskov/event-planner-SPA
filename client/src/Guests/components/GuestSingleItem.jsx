import React, { Fragment, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail, AiOutlineCheckCircle, AiOutlineUndo } from 'react-icons/ai';

import GuestEmailForm from './GuestEmailForm';
import Modal from '../../shared/components/Modals/Modal';
import Woman from '../../assets/woman.svg'
import Man from '../../assets/man.svg'

const GuestSingleItem = (props) => {

    const [showEmail, setShowEmail ] = useState(false);

    const hideEmailModal = () => {
        setShowEmail(false);
    };

    const showEmailModal = () => {
        setShowEmail(true);
    }

    return (
        <Fragment>
            { showEmail && 
            <Modal removeModal={hideEmailModal}>
                <GuestEmailForm removeModal={hideEmailModal}
                 email={props.email}
                 onEmailSending={props.onEmailSending}/>
            </Modal>
            }
            <div className='guest-container' style={{background: props.isConfirmed && '#BFF1B3'}}>
                <div className='guest-icon'>
                    {
                        props.gender === 'female'
                        ?  <img src={Woman} alt='woman'/> : <img src={Man} alt='man' />
                    }
                </div>
                <div className='guest-wrapper'>
                    <div className='guest-names'>
                        <p>{props.firstName}</p>
                        <p>{props.lastName}</p>
                    </div>
                    <div className='guest-info'>
                        <p>E-mail: {props.email}</p>
                        <p>Age: {props.age}</p>
                    </div>
                    <div className='guest-settings'>
                        <p onClick={props.delete}><AiOutlineDelete /></p>
                        <p onClick={props.edit}><AiOutlineEdit /></p>
                        <p onClick={showEmailModal}><AiOutlineMail /></p>
                        {
                        !props.isConfirmed ? 
                        <p onClick={props.confirmed}><AiOutlineCheckCircle /></p>
                        :
                        <p onClick={props.unconfirmed}><AiOutlineUndo /></p>
                        } 
                    </div>
                </div>         
            </div>
        </Fragment>
    )

}

export default GuestSingleItem;