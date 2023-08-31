import React from 'react';
import './index_user_panel.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="gallery-user_panel">
        <Link href="./user_panel/course">
          <img src="./kursy.png" alt="Kursy" className='center-image-user_panel' />
        </Link>
        <Link href="./forum">
          <img src="./hiszpania.jpg" alt="Forum" className='center-image-user_panel' />
        </Link>
      </div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>
  );
};

export default App;