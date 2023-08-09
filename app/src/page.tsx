import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <p> Numer projektu Tytuł projekty </p>
      <div className="left-buttons">
        <button> Project description </button>
        <button> Participanting institutions </button>
        <button> Course deescription </button>
      </div>
      <div className="right-buttons"> 
        <button> Register </button>
        <button> Login to the platform </button>
      </div>
    <div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>
    </div>
    
  );
};

export default App;