import React from "react";
import Link from "next/link";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="./ProjectDescription.pdf" download>
             Project description 
          </a>
        </li>
        <li className="navbar-item">
          <a href="./ParticipantingInstitutions.pdf" download>
            Participanting institutions
          </a>
        </li>
        <li className="navbar-item">
          <a href="./CourseDescription.pdf" download>
            Course description
          </a>
        </li>
        <li className="navbar-list-right">
          Zaloguj sie
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* <p className="">Numer projektu Tytuł projektu</p> */}
      <div className="gallery-app">
        <Link href="./src" className="link">
          <img src="./polska.jpg" alt="Flag 1" className="center-image-app" />
        </Link>
        <Link href="./src" className="link">
          <img
            src="./hiszpania.jpg"
            alt="Flag 2"
            className="center-image-app"
          />
        </Link>
      </div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>
  );
};

export default App;
