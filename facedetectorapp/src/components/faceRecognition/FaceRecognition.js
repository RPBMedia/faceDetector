import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  return (
    <div className="center mt4 ma">
      <div className="absolute mb4">
        <img id="inputimage" className="ba bw2 b--black-80 br4" alt='' src={imageUrl} width="500" height="auto"/>
        {
          faceBoxes.map((faceBox, index) => {
            return (
              <div key={index}
                className='bounding-box'
                style={{
                top: faceBox.topRow,
                right: faceBox.rightCol,
                bottom: faceBox.bottomRow,
                left: faceBox.leftCol}}
              >
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default FaceRecognition;
