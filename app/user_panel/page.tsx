import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <div className="gallery">
        <img src="./polska.jpg" alt="Flag 1" className='center-image'/>
        <img src="./hiszpania.jpg" alt="Flag 2" className='center-image'/>
      </div>
    </div>
  );
};

export default App;