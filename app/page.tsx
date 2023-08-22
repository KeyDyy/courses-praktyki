
import React from "react";
import Link from "next/link"; // Importuj Link z Next.js
import "./index.css";
import Navbar from "@/components/Navbar";


const App = () => {
  return (
    <div className="app">
      <Navbar />
      <p className=""> Numer projektu Tytuł projekty </p>
      <div className="gallery-app">
        <Link href="./src" className="link">
          <img src="./polska.jpg" alt="Flag 1" className="center-image-app" />
        </Link>
        <Link href="./src" className="link">
          <img src="./hiszpania.jpg" alt="Flag 2" className="center-image-app" />
        </Link>
      </div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>

  );
};

export default App;
