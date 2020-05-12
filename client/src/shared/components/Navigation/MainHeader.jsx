import React, { useState, Fragment, useContext } from 'react';
import { RiLightbulbFlashLine, RiLightbulbLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

import Button from '../Buttons/Button';
import SideBar from './SideBar';
import Modal from '../Modals/Modal';
import Authentication from '../../../Users/pages/Authentication';
import AuthHeader from './AuthHeader';
import { ThemeContext, themes } from '../../../shared/contexts/theme-context';
import { AuthContext } from '../../contexts/auth-context';
import Logo from '../../../assets/Logo.svg'

const MainHeader = () => {

    const [ openSideBar, setOpenSideBar ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { isLoggedIn, logout } = useContext(AuthContext);
    const history = useHistory();

    const toggleSideBar = () => {
        setOpenSideBar(prevState => !prevState)
    }

    const showModalHandler = () => {
        setShowModal(true);
    }

    const removeModalHandler = () => {
        setShowModal(false);
    }

    const onLogoutHandler = () => {
        logout();
        setOpenSideBar(false);
        history.replace('/')
    }


    return(
        <Fragment>
            {
                showModal && 
                <Modal removeModal={removeModalHandler}>
                    <Authentication removeModal={removeModalHandler}
                    setShowModal={setShowModal}/>
                </Modal>
            }
            {
                openSideBar && <SideBar />
            }
            {isLoggedIn && <AuthHeader />}
            <header style={theme} className='main-header'>
                {
                    isLoggedIn &&
                    <div onClick={toggleSideBar} className='menu'>
                        <p />
                        <p />
                        <p />
                    </div>
                }
                <div className='logo'>
                    <img src={Logo} alt='logo-img' />
                </div>
                <div className='menu-buttons'>
                    { !isLoggedIn ?
                        <Button clickIt={showModalHandler}>Login</Button>
                        : <Button clickIt={onLogoutHandler}>Logout</Button>
                    }                 
                    <button className='bulb' onClick={toggleTheme}>
                        {theme === themes.light ? <RiLightbulbFlashLine style={{color: 'orange'}}/> 
                        : <RiLightbulbLine />}</button>
                </div>
            </header>
        </Fragment>
    )

}

export default MainHeader;