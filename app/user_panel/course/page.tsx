"use client";
import React, { useState, useEffect } from "react";
import "./index_course.css";
import Navbar from "@/components/Navbar";
import { userStats } from "@/utils/statsUser";
import { useUser } from "@/app/context/user";

interface UserStatsData {
  module_id: number;
  module_name: string;
  quizResult_points: number | null;
  totalPossiblePoints: number;
  bestResult: number | null;
}

const App = () => {
  const { user } = useUser();

  const [userStatsData, setUserStatsData] = useState<UserStatsData[] | null>(
    null
  );

  useEffect(() => {
    async function fetchUserQuizStats() {
      if (user && user.id) {
        const stats = await userStats(user.id);
        setUserStatsData(stats);
      }
    }

    fetchUserQuizStats();
  }, [user]);

  const totalModules = userStatsData?.length || 1;
  const totalPoints = userStatsData
    ? userStatsData.reduce((sum, stat) => sum + (stat.bestResult || 0), 0)
    : 0;

  const totalPossiblePoints = userStatsData
    ? userStatsData.reduce((sum, stat) => sum + stat.totalPossiblePoints, 0)
    : 0;

  const zeroPercentModules = userStatsData
    ? userStatsData.filter((stat) => stat.totalPossiblePoints === 0).length
    : 0;

  const allQuestions = userStatsData
    ? userStatsData.reduce((sum, stat) => sum + stat.totalPossiblePoints, 0)
    : 0;

  const averageProgress =
    (totalPoints / allQuestions) *
    ((totalModules - zeroPercentModules) / totalModules) *
    100;
  return (
    <div className="app">
      <Navbar />
      <table className="module-table-course">
        <tbody>
          {userStatsData &&
            userStatsData.map((stat) => (
              <tr key={stat.module_id}>
                <td>{stat.module_name}</td>
                <td>
                  <a
                    href={`../LearningMaterialsModule${stat.module_id}.pdf`}
                    download
                  >
                    <button>Get Learning Materials</button>
                  </a>
                </td>
                <td>
                  <a href={`../quiz/${stat.module_id}`}>
                    <button>Test of Knowledge</button>
                  </a>
                </td>
                <td>
                  <span className="quiz-percentage">
                    {stat.totalPossiblePoints > 0
                      ? `${Math.round(
                          ((stat.bestResult || 0) / stat.totalPossiblePoints) *
                            100
                        )}%`
                      : "N/A"}
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
