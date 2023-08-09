import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <div className="gallery">
        <img src="./polska.jpg" alt="Kursy" className='center-image'/>
        <img src="./hiszpania.jpg" alt="Forum" className='center-image'/>
      </div>
    </div>
  );
};

export default App;