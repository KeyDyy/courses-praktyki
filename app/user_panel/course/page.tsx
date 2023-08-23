"use client";
//import React from 'react';
import "./index_course.css";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./index_course.css";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import Navbar from "@/components/Navbar";

const App = () => {
  const modules = [
    { id: 1, title: "Module 1", quizPercentage: 50 },
    { id: 2, title: "Module 2", quizPercentage: 50 },
    { id: 3, title: "Module 3", quizPercentage: 75 },
    { id: 4, title: "Module 4", quizPercentage: 100 },
    { id: 5, title: "Module 5", quizPercentage: 100 },
  ];

  const totalModules = modules.length;
  const totalProgress = modules.reduce(
    (sum, module) => sum + module.quizPercentage,
    0
  );
  const averageProgress = totalProgress / totalModules;

  return (
    <div className="app">
      <Navbar />
      <table className="module-table">
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.title}</td>
              <td>
                <a href={`../LearningMaterialsModule${module.id}.pdf`} download>
                  <button>Get Learning Materials</button>
                </a>
              </td>
              <td>
                <a href={`../quiz/${module.id}`}>
                  <button>Test of Knowledge</button>
                </a>
              </td>
              <td>
                <span className="quiz-percentage">
                  {module.quizPercentage}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${averageProgress}%` }}
        ></div>
      </div>
      <a href="CertificateWersjaWstępna" download>
        <button className="certificate-button">Get certificate in pdf</button>
      </a>
    </div>
  );
};

export default App;
