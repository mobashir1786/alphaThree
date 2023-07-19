import React from 'react';
import menu from "../assets/menubtn.png";
import logo from "../assets/logo.png";
import Landing from './Landing'
// import Fullmoon from './Fullmoon';

function Alpha() {
    return (
        <div className='alpha'>
            <div className='menu'><img src={menu} alt="menu" /></div>
            <div className='content'><Landing /></div>
            {/* <div className='content'><Fullmoon /></div> */}
            <div className='logo'><img src={logo} alt="menu" /></div>
        </div>
    )
}

export default Alpha