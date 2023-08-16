import React from 'react';
import './index.css';
import Link from 'next/link';

const App = () => {
  return (
    <div className="app">
      <div className="gallery">
        <Link href="./user_panel/course" className="link">
          <img src="./polska.jpg" alt="Kursy" className='center-image'/>
        </Link>
        <Link href = "./user_panel/forum" className="link">
          <img src="./hiszpania.jpg" alt="Forum" className='center-image'/>
        </Link>
      </div>
    </div>
  );
};

export default App;