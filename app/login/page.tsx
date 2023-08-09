import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <div className="inputs">
        <input type="text" placeholder="Enter your login" id = "login"/>
        <input type="text" placeholder="Enter your password" id = "password"/>
      </div>
      <div className="register"> 
        <button> Login to the platform </button> 
      </div>
      <div className="register"> 
        <button> Register </button>
      </div>
    </div>
    
  );
};

export default App;