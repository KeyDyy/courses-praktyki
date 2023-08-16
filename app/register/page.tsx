import React from 'react';
import './index.css';
import Link from 'next/link';

const App = () => {
  return (
    <div className="app">
      <h1> Rejestracja umożliwia uzyskanie dostępu do kursów. </h1>
      <h2> Zapisz się już dziś! </h2>
      <div className="inputs">
        <input type="text" placeholder="Enter your name" id = "name"/>
        <input type="text" placeholder="Enter your surname" id = "surname"/>
        <input type="text" placeholder="Enter your login" id = "login"/>
        <input type="text" placeholder="Enter your password" id = "password"/>
        <input type="text" placeholder="Enter your password again"  id = "password2"/>
      </div>
      <div className="register"> 
        <Link href = "./user_panel">
        <button> Register </button>
        </Link>
      </div>
      <Link href = "./login">
        <button> Login to the platform </button>
      </Link>
    </div>
    
  );
};

export default App;