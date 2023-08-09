import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <p className=''> Numer projektu Tytuł projekty </p>
      <div className="gallery">
        <img src="./polska.jpg" alt="Flag 1" className='center-image'/>
        <img src="./hiszpania.jpg" alt="Flag 2" className='center-image'/>
      </div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>
  );
};

export default App;