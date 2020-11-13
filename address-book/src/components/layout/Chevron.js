import React from 'react';
import chevron from './chevron.png';

const Chevron = () => {
  return (
    <div>
      <img src={chevron} alt="decoration" 
        style={{ width: '500px', display: 'block', position: 'absolute' }}
      />
    </div>
  )
}

export default Chevron;