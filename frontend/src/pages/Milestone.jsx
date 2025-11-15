import React, { useEffect, useMemo } from "react";
import { useNavigate} from "react-router-dom";

const MILESTONES = [1, 5, 10, 15, 20, 25, 30, 35, 41];

const ACHIEVEMENTS = [
  // 1–10
  {
    title: "Attend New Student Orientation",
    description:
      "Learn about KSU and get registered for your first semester’s classes!",
    stage: "Freshman",
  },
  {
    title: "Attend Weeks of Welcome Event",
    description:
      "Join the welcome series hosted by Student Affairs at the start of each semester.",
    stage: "Freshman–Junior",
  },
  {
    title: "Create your first Plan of Study with your Academic Advisor",
    description:
      "Build a roadmap of what to take each semester until graduation.",
    stage: "Freshman–Senior",
  },
  {
    title: "Create your Graduation Plan with your Academic Advisor",
    description:
      "When 2–3 semesters away, review your DegreeWorks audit and finalize your remaining courses.",
    stage: "Junior–Senior",
  },
  {
    title: "Attend First-Year Convocation",
    description:
      "Be officially welcomed to KSU at the FLIGHT event—meet your class and wear your jersey!",
    stage: "Freshman",
  },
  {
    title: "Attend your First Scrappy Hour",
    description:
      "Take a break with Scrappy, enjoy an ice cream float, and take home a souvenir cup.",
    stage: "Freshman",
  },
  {
    title: "Attend your First CCSE Student Community Day",
    description:
      "Meet fellow CCSE students, connect with faculty, and network during a community lunch.",
    stage: "Freshman",
  },
  {
    title: "Sign up to be a Mentee in the CCSE Mentoring Program",
    description:
      "Join the mentoring program to grow with guidance from peers and professionals.",
    stage: "Freshman–Senior",
  },
  {
    title: "Explore Research Opportunities",
    description:
      "Engage in individual or team-based research and innovate solutions for real-world problems.",
    stage: "Freshman",
  },
  {
    title: "Listen to an Episode of the Wellbeing@KSU Podcast",
    description:
      "Discover ways to care for your wellbeing and balance college life through campus resources.",
    stage: "Freshman",
  },

  // 11–20
  {
    title: "Complete CSE 1321/L Programming & Problem Solving I with Lab",
    description:
      "Take your first step into programming and problem-solving fundamentals.",
    stage: "Freshman",
  },
  {
    title: "Complete a Second Programming Course",
    description:
      "Build on your programming foundation and strengthen your coding confidence.",
    stage: "Freshman",
  },
  {
    title: "Follow the CCSE Instagram",
    description: "Stay updated with events and opportunities @ksuccse.",
    stage: "Freshman–Senior",
  },
  {
    title: "Participate in your First CCSE Fall Ideathon",
    description:
      "Collaborate in diverse teams to solve creative challenges—no coding required!",
    stage: "Freshman–Senior",
  },
  {
    title: "Sign up to be a Peer Mentor in the CCSE Mentoring Program",
    description:
      "Support new students and develop leadership, time management, and communication skills.",
    stage: "Sophomore–Senior",
  },
  {
    title: "Join a Registered Student Organization on OwlLife",
    description:
      "Connect with others, build new skills, and have fun while boosting your resume.",
    stage: "Sophomore–Senior",
  },
  {
    title: "Become a Tutor for CSE 1321/L or CSE 1322/L",
    description:
      "Help other students succeed while strengthening your own technical expertise.",
    stage: "Sophomore–Senior",
  },
  {
    title: "Learn an Industry-Standard Tool or Language",
    description:
      "Gain confidence using Git, Python, Java, or SQL for real-world applications.",
    stage: "Sophomore",
  },
  {
    title: "Participate in a Volunteer Experience",
    description:
      "Make an impact, build soft skills, and connect with others through service.",
    stage: "Sophomore–Senior",
  },
  {
    title: "Participate in your First CCSE Spring Hackathon",
    description:
      "Collaborate with peers to build something awesome and learn by doing.",
    stage: "Sophomore–Senior",
  },

  // 21–30
  {
    title: "Sign up on Handshake",
    description:
      "Access jobs, internships, and career events personalized for you.",
    stage: "Sophomore–Senior",
  },
  {
    title: "Attend a CCSE Employer Networking Night Event (First)",
    description:
      "Meet employers face-to-face and make your first professional connections.",
    stage: "Sophomore",
  },
  {
    title:
      "Attend a Workshop for the Business Process Management Certificate",
    description:
      "Build career-ready skills by attending a BPM for the Modern Professional workshop.",
    stage: "Sophomore",
  },
  {
    title:
      "Earn the Business Process Management for the Modern Professional Certificate",
    description:
      "Complete all BPM workshops and showcase your certificate on LinkedIn.",
    stage: "Sophomore–Senior",
  },
  {
    title: "Do a Resume Writing Workshop or Review with CPD",
    description:
      "Improve your resume with feedback from Career Planning & Development.",
    stage: "Junior–Senior",
  },
  {
    title: "Attend a Second CCSE Employer Networking Night Event",
    description:
      "Return to build deeper professional relationships with employers.",
    stage: "Junior–Senior",
  },
  {
    title: "Serve as an Officer in a Registered Student Organization",
    description:
      "Gain leadership and teamwork experience that stands out on your resume.",
    stage: "Junior–Senior",
  },
  {
    title: "Attend your First Career Fair",
    description:
      "Meet recruiters, explore opportunities, and practice professional conversations.",
    stage: "Junior–Senior",
  },
  {
    title: "Develop Your Elevator Pitch",
    description:
      "Craft a short and confident self-introduction for professional settings.",
    stage: "Junior–Senior",
  },
  {
    title: "Do an Internship",
    description:
      "Get real-world experience and discover your ideal career path.",
    stage: "Junior–Senior",
  },

  // 31–41
  {
    title: "Build a Portfolio of Coding or Class Projects",
    description:
      "Showcase your growth and skills through a portfolio website.",
    stage: "Junior–Senior",
  },
  {
    title: "Attend a C-Day Event as a Guest",
    description:
      "Explore innovative student projects and network with industry guests.",
    stage: "Junior–Senior",
  },
  {
    title: "Set up or Update Your LinkedIn Profile",
    description:
      "Build your professional presence online and connect with recruiters.",
    stage: "Junior–Senior",
  },
  {
    title: "Follow the College of Computing & Software Engineering on LinkedIn",
    description:
      "Stay informed with the latest news, events, and opportunities.",
    stage: "Junior–Senior",
  },
  {
    title:
      "Complete the Prerequisite Courses for Your Senior Project or Capstone",
    description:
      "Prepare for your capstone and demonstrate readiness to apply your skills.",
    stage: "Junior",
  },
  {
    title: "Attend the Senior Cookout Hosted by CPD",
    description:
      "Celebrate your progress and connect with other seniors and employers.",
    stage: "Senior",
  },
  {
    title: "Meet with Your Academic Advisor to Confirm Final Semester Classes",
    description:
      "Make sure you're ready to graduate by verifying your last set of courses.",
    stage: "Senior",
  },
  {
    title: "Petition to Graduate",
    description:
      "Apply on Owl Express to begin your degree audit and sign up for commencement.",
    stage: "Senior",
  },
  {
    title: "Meet with a Mentor Working in Industry",
    description:
      "Gain insight, advice, and connections from a professional in your field.",
    stage: "Senior",
  },
  {
    title: "Attend C-Day as a Presenter",
    description:
      "Showcase your senior project to faculty, peers, and industry professionals.",
    stage: "Senior",
  },
  {
    title: "Attend Your Commencement Ceremony",
    description:
      "Celebrate your academic journey with classmates, family, and faculty.",
    stage: "Senior",
  },
];


export default function Milestone({ attendedCount }) {
  const unlockedCount = Math.min(attendedCount, ACHIEVEMENTS.length);
  const achievedTitles = useMemo(
    () => new Set(ACHIEVEMENTS.slice(0, unlockedCount).map((a) => a.title)),
    [unlockedCount]
  );
  const progressPct = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);
  const achievedMilestones = useMemo(
    () => new Set(MILESTONES.filter((m) => unlockedCount >= m)),
    [unlockedCount]
  );

  useEffect(() => {
    triggerConfetti(unlockedCount);
  }, [unlockedCount]);

  return (
    <div className="page-container">
      <header className="header">
        <h1>Milestones</h1>
        <p>
          Unlock achievements and reach milestones as you attend events. ({unlockedCount}/{ACHIEVEMENTS.length})
        </p>
      </header>

      <main className="main">
        {/* Progress Summary */}
        <section className="progress-section">
          <h2>Progress Overview</h2>
          <p>{unlockedCount} / {ACHIEVEMENTS.length} achievements unlocked</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
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
                className={`milestone-item ${achievedMilestones.has(m) ? "unlocked" : "locked"}`}
              >
              
                <div className="milestone-title">
                  {m === 1 ? "First Milestone" : m === 41 ? "Final Milestone" : `${m} Milestones`}
                </div>
                <p className="milestone-status">
                  {achievedMilestones.has(m) ? "Unlocked" : "Locked"}
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
              const unlocked = achievedTitles.has(a.title);
              return (
                <li
                  key={index}
                  className={`achievement-item ${unlocked ? "unlocked" : "locked"}`}
                >
                  <h4>{index + 1}. {a.title}</h4>
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
  );
}

function triggerConfetti(amount) {}
function confettiGradient() {}
