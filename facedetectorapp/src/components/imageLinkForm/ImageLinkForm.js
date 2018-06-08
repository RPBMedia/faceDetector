import React from 'react';
import './ImageLinkForm.css';
import Dropdown from 'react-dropdown'

const models = [
  {
    value:'GENERAL_MODEL',
    label: 'General Model',
    className: 'optionClass',
  },
  {
    value:'FACE_DETECT_MODEL',
    label: 'Face Detection Model',
    className: 'optionClass',
  }
];

const ImageLinkForm = ({
  onInputChange,
  onSubmit,
  onDropdownSelect,
  modelLabel,
}) => {
  return (
    <div className='mb4'>
      <p className='f2'>
        {'Welcome to the face detector app'}
      </p>
      <p className='f5'>
        {'This detector will find faces in your pictures. Place a URL to a picture below to try it out'}
      </p>

      <div className="dropdownContainer">
      <Dropdown
        className="modelDropdown"
        options={models}
        onChange={onDropdownSelect}
        value={models[1]}
        placeholder='Select a model'
      />
      </div>

      <div className="center mt5">
        <div className="center form pa4 br4 shadow-5">
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder="Enter a url for an image"/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
