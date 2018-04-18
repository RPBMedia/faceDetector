import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center mt4 ma">
      <div className="absolute">
        <img alt='' src={imageUrl} width="500" haight="auto"/>
      </div>
    </div>
  );
}

export default FaceRecognition;
