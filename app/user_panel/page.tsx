import React from 'react';
import './index_user_panel.css';
import Link from 'next/link';

const App = () => {
  return (
    <div className="app">
      <div className="gallery-user_panel">
        <Link href="./user_panel/course">
          <img src="./polska.jpg" alt="Kursy" className='center-image-user_panel'/>
        </Link>
        <Link href = "./user_panel/forum">
          <img src="./hiszpania.jpg" alt="Forum" className='center-image-user_panel'/>
        </Link>
      </div>
    </div>
  );
};

export default App;