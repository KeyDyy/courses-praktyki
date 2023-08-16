import React from "react";
import "./index.css";
import Link from "next/link";

const src = () => {
  return (
    <div className="app">
      <p> Numer projektu Tytuł projekty </p>
      <div className="left-buttons">
        <a href="./ProjectDescription.pdf" download>
          <button> Project description </button>
        </a>
        <a href="./ParticipantingInstitutions.pdf" download>
          <button> Participanting institutions </button>
        </a>
        <a href="./CourseDescription.pdf" download>
          <button> Course description </button>
        </a>
      </div>
      <div className="right-buttons">
        <Link href = "./register" >
          <button> Register </button>
        </Link>
        <Link href = "./login">
          <button> Login to the platform </button>
        </Link>
      </div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>
  );
};

export default src;
