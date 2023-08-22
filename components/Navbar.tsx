"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/app/context/user";

const Navbar = () => {
  const { user, logout } = useUser();

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

        {user ? (
          <>
            <li id="welcome" className="navbar-list-right">
              Witaj{user.email ? `, ${user.email}` : ""}!
            </li>
            <li className="navbar-list-right">
              <a onClick={logout}>Wyloguj się</a>
            </li>
          </>
        ) : (
          <li className="navbar-list-right">
            <a href="/auth">Zaloguj się</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
