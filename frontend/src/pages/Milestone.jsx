import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import milestoneServices from "../api/milestoneServices";

import userServices from "../api/userServices";
import Navbar from "../components/Navbar";

const MILESTONES = [1, 5, 10, 15, 20, 25, 30, 35, 41];

export default function Milestone({ attendedCount }) {
  const [ACHIEVEMENTS, setACHIEVEMENTS] = useState([]);
  const [completeMilestone, setCompleteMilestone] = useState([]);
  const userId = localStorage.getItem("LoggedInID");

  const safeCount = Number(attendedCount) || 0;
  const unlockedCount = Math.min(safeCount, ACHIEVEMENTS.length);
  const achievedTitles = useMemo(
    () => new Set(ACHIEVEMENTS.slice(0, unlockedCount).map((a) => a.title)),
    [unlockedCount]
  );
  const progressPct = Math.round((completeMilestone.length / ACHIEVEMENTS.length) * 100);
  const achievedMilestones = useMemo(
    () => new Set(MILESTONES.filter((m) => unlockedCount >= m)),
    [unlockedCount]
  );

  const fetchData = async () => {
    try {
      const res = await milestoneServices.getMilestones();
      console.log(res.data);
      if (res.data) {
        setACHIEVEMENTS(res.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await milestoneServices.getCompletedMilestones(userId);
      console.log(res.data);
      if (res.data.completedMilestones) {
        setCompleteMilestone(res.data.completedMilestones);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    triggerConfetti(unlockedCount);
    fetchData();
    fetchUser();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="page-container myevent-main">
        <header className="header">
          <h1>Milestones</h1>
          <p>
            Unlock achievements and reach milestones as you attend events. (
            {completeMilestone.length}/{ACHIEVEMENTS.length})
          </p>
        </header>

        <main className="main">
          {/* Progress Summary */}
          <section className="progress-section">
            <h2>Progress Overview</h2>
            <p>
              {completeMilestone.length} / {ACHIEVEMENTS.length} achievements unlocked
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
            <p className="progress-label">{progressPct}% complete</p>
          </section>

          {/* Milestone Badges */}
          <section className="milestone-section">
            <h3>Milestones</h3>
            <ul className="milestone-list">
              {MILESTONES.map((m, i) => (
                <li
                  key={i}
                  className={`milestone-item ${
                    // achievedMilestones.has(m) 
                    completeMilestone.length >= m
                    ? "unlocked" : "locked"
                  }`}
                >
                  <div className="milestone-title">
                    {m === 1
                      ? "First Milestone"
                      : m === 41
                      ? "Final Milestone"
                      : `${m} Milestones`}
                  </div>
                  <p className="milestone-status">
                    { completeMilestone.length >= m ? "Unlocked" : "Locked"}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements Grid */}
          <section className="achievement-section">
            <h3>Your Achievements</h3>
            <ul className="achievement-list">
              {ACHIEVEMENTS.map((a, index) => {
                const unlocked = completeMilestone.includes(a.title);
                return (
                  <li
                    key={index}
                    className={`achievement-item ${
                      unlocked ? "unlocked" : "locked"
                    }`}
                  >
                    <h4>
                      {index + 1}. {a.title}
                    </h4>
                    <p>{a.description}</p>
                    <p className="achievement-stage">Stage: {a.stage}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>

        <div id="confetti-root" className="confetti-root" />
      </div>
    </div>
  );
}

function triggerConfetti(amount) {}
function confettiGradient() {}
