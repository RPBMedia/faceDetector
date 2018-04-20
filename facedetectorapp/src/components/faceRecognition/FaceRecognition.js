import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center mt4 ma">
      <div className="absolute mb4">
        <img className="ba bw2 b--black-80 br4" alt='' src={imageUrl} width="500" height="auto"/>
      </div>
    </div>
  );
}

export default FaceRecognition;
