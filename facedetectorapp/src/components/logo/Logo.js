import React from 'react';
import Tilt from 'react-tilt';
import logo from '../../assets/images/logo.png';
// import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 160, width: 160 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '10px'}} alt='logo' src={logo}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
