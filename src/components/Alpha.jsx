import React, { useState, useEffect } from 'react';
import menu from "../assets/menubtn.png";
import logo from "../assets/logo.png";
import Landing from './Landing'
import Fullmoon from './Fullmoon';
import Halfmoon from './Halfmoon';
import Brain from './Brain';

function Alpha() {
    const [currentComponent, setCurrentComponent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentComponent((prevComponent) => (prevComponent + 1) % 4);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const renderComponent = () => {
        switch (currentComponent) {
            case 0:
                return <Landing />;
            case 1:
                return <Fullmoon />;
            case 2:
                return <Halfmoon />;
            case 3:
                return <Brain />;
            default:
                return null;
        }
    };

    return (
        <div className='alpha'>
            <div className='menu'><img src={menu} alt="menu" /></div>
            <div className='content'>{renderComponent()}</div>
            {/* <div className='content'><Landing /></div> */}
            {/* <div className='content'><Fullmoon /></div> */}
            {/* <div className='content'><Halfmoon /></div> */}
            {/* <div className='content'><Brain /></div> */}
            <div className='logo'><img src={logo} alt="menu" /></div>
        </div>
    )
}

export default Alpha