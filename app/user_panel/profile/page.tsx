"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/user";
import Navbar from "@/components/Navbar";
import { userStats as fetchUserStats } from "@/utils/statsUser";
import "./index.css";

const ProfilePage = () => {
  const { user } = useUser();
  const [userStats, setUserStats] = useState<Array<{
    module_id: number;
    module_name: string;
    quizResult_points: number | null;
    totalPossiblePoints: number;
    attemptDate: string;
    bestResult: number | null;
  }> | null>(null);

  useEffect(() => {
    async function fetchUserQuizStats() {
      if (user !== null && user.id !== null) {
        const stats = await fetchUserStats(user.id);
        setUserStats(stats);
      }
    }

    fetchUserQuizStats();
  }, [user]);

  if (!user) {
    return (
      <div>
        <div>Please sign in</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="Greetings">Witaj, {user.first_name}!</div>
        <div className="profile-container">
          <div className="left-section">
            <div className="left-section-top">
              <div className="left-section-r">
                <div className="userParameters">
                  <h6>Imie</h6>
                  <p className="text-muted">{user.first_name}</p>
                  <h6>Nazwisko</h6>
                  <p className="text-muted">{user.last_name}</p>
                  <h6>Email</h6>
                  <p className="text-muted">{user.email}</p>
                  <h6>Język</h6>
                  <p className="text-muted">{user.language}</p>
                </div>
              </div>
              <div className="left-section-l">
                <div className="photo">{user.image}</div>
              </div>
            </div>
            <div className="left-section-bottom">
              <hr />
              <div className="userChangeParameters">
                <button>
                  <a href="/user_panel/profile/edit_Profile">
                    Edytuj swoje dane
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="right-section">
            <div className="userAchievements">
              {userStats !== null ? (
                userStats.map((stat, index) => (
                  <div key={index}>
                    {stat.totalPossiblePoints > 0 && (
                      <p>
                        Statystyki dla modułu "{stat.module_name}":{" "}
                        {stat.bestResult !== null
                          ? `${stat.bestResult} / ${stat.totalPossiblePoints}`
                          : "Brak dostępnych statystyk"}
                        {"\t - \t"}
                        Data podejścia: {stat.attemptDate}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>Brak dostępnych statystyk</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
