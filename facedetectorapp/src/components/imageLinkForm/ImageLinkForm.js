import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
  return (
    <div>
      <p className='f2'>
        {'Welcome to the face detector app'}
      </p>
      <p className='f5'>
        {'This detector will find faces in your pictures. Place a URL to a picture below to try it out'}
      </p>
      <div className="center mt4">
        <div className="center form pa4 br4 shadow-5">
          <input className='f4 pa2 w-70 center' type='text' />
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue pointer'>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
