import React from 'react';
import './index.css';
import Link from 'next/link';

const App = () => {
  return (
    <div className="app">
      <h1> Rejestracja umożliwia uzyskanie dostępu do kursów. </h1>
      <h2> Zapisz się już dziś! </h2>
      <div className="inputs">
        <input type="text" placeholder="Enter your login" id = "login"/>
        <input type="text" placeholder="Enter your password" id = "password"/>
      </div>
      <div className="register"> 
        <Link href = "./user_panel" >
          <button> Login to the platform </button> 
        </Link>      
      </div>
      <div className="register"> 
      <Link href = "./register">
        <button> Register </button>
      </Link>
      </div>
    </div>
    
  );
};

export default App;