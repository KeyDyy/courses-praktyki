"use client";
import React from "react";
import Link from "next/link";
import "./index.css";
import { useUser } from "@/app/context/user";
import Navbar from "@/components/Navbar";

const App = () => {
  const { user } = useUser();
  return (
    <div className="app">
      <Navbar />
      <div className="gallery-app">
        <Link href={user ? "./user_panel" : "/auth"} className="link">
          <img src="./polska.jpg" alt="Flag 1" className="center-image-app" />
        </Link>
        <Link href={user ? "./user_panel" : "/auth"} className="link">
          <img src="./hiszpania.jpg" alt="Flag 2" className="center-image-app"
/>
        </Link>
      </div>
      <img src="./unia.jpg" alt="Flag 3" className="bottom-image" />
    </div>
  );
};

export default App;
