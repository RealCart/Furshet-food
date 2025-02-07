import React from 'react';
import { ClipLoader } from 'react-spinners';

function LoadingModal() {
  return (
    <div className="food_info">
        <div className="loading">
            <ClipLoader color="#8B0506" size={250}/>
        </div>
    </div>
  )
}

export default LoadingModal