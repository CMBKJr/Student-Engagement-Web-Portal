import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import participationRoutes from "./routes/participationRoutes.js";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { ingestRssAlone } from "./transformRss.js";
import { createMilestone } from "./controller/milestoneController.js";
import { milestoneModel } from "./model/milestoneModel.js";
import jwt from "jsonwebtoken";
import multer from "multer";

// import milestoneRoutes from './routes/milestoneRoutes.js'

dotenv.config();

// app setup
const app = express();

// Database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// api home page
app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the backend" });
});

// routes mounting
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/participate", participationRoutes);

// automate rss ingest
cron.schedule("0 1 * * *", ingestRssAlone, {
  scheduled: true,
  timezone: "America/New_York",
});

// setInterval(() => {
//   ingestRssAlone()
//   console.log('printing from setInterval') 
// }
// , 24 * 60 * 60 * 1000);
// ingestRssAlone()

// ports
const port = 8080 || process.env.PORT;

// const achieves = [
//   // 1–10
//   {
//     title: "Attend New Student Orientation",
//     description:
//       "Learn about KSU and get registered for your first semester’s classes!",
//     stage: "Freshman",
//     autoKeywords: ["orientation", "new student", "nso", "freshman", "welcome"]
//   },
//   {
//     title: "Attend Weeks of Welcome Event",
//     description:
//       "Join the welcome series hosted by Student Affairs at the start of each semester.",
//     stage: "Freshman–Junior",
//     autoKeywords: ["weeks of welcome", "wow", "welcome week", "student affairs", "kickoff"]
//   },
//   {
//     title: "Create your first Plan of Study with your Academic Advisor",
//     description:
//       "Build a roadmap of what to take each semester until graduation.",
//     stage: "Freshman–Senior",
//     autoKeywords: ["advisor", "plan of study", "academic advising", "degree plan", "course planning"]
//   },
//   {
//     title: "Create your Graduation Plan with your Academic Advisor",
//     description:
//       "When 2–3 semesters away, review your DegreeWorks audit and finalize your remaining courses.",
//     stage: "Junior–Senior",
//     autoKeywords: ["graduation plan", "advisor", "degreeworks", "grad plan", "academic advising"]
//   },
//   {
//     title: "Attend First-Year Convocation",
//     description:
//       "Be officially welcomed to KSU at the FLIGHT event—meet your class and wear your jersey!",
//     stage: "Freshman",
//     autoKeywords: ["convocation", "flight", "first year", "welcome event", "freshman event"]
//   },
//   {
//     title: "Attend your First Scrappy Hour",
//     description:
//       "Take a break with Scrappy, enjoy an ice cream float, and take home a souvenir cup.",
//     stage: "Freshman",
//     autoKeywords: ["scrappy hour", "scrappy", "ice cream float", "student life", "ksu traditions"]
//   },
//   {
//     title: "Attend your First CCSE Student Community Day",
//     description:
//       "Meet fellow CCSE students, connect with faculty, and network during a community lunch.",
//     stage: "Freshman",
//     autoKeywords: ["c-day", "community day", "community", "student lunch", "ccse event"]
//   },
//   {
//     title: "Sign up to be a Mentee in the CCSE Mentoring Program",
//     description:
//       "Join the mentoring program to grow with guidance from peers and professionals.",
//     stage: "Freshman–Senior",
//     autoKeywords: ["ccse mentor", "mentee", "mentoring program", "mentorship", "ccse advising"]
//   },
//   {
//     title: "Explore Research Opportunities",
//     description:
//       "Engage in individual or team-based research and innovate solutions for real-world problems.",
//     stage: "Freshman",
//     autoKeywords: ["research", "undergraduate research", "urec", "research seminar", "research opportunity"]
//   },
//   {
//     title: "Listen to an Episode of the Wellbeing@KSU Podcast",
//     description:
//       "Discover ways to care for your wellbeing and balance college life through campus resources.",
//     stage: "Freshman",
//     autoKeywords: ["wellbeing", "podcast", "ksu wellbeing", "mental health", "wellbeing@ksu"]
//   },

//   // 11–20
//   {
//     title: "Complete CSE 1321/L Programming & Problem Solving I with Lab",
//     description:
//       "Take your first step into programming and problem-solving fundamentals.",
//     stage: "Freshman",
//     autoKeywords: ["cse1321", "programming i", "lab", "cs course", "intro programming"]
//   },
//   {
//     title: "Complete a Second Programming Course",
//     description:
//       "Build on your programming foundation and strengthen your coding confidence.",
//     stage: "Freshman",
//     autoKeywords: ["cse1322", "cse course", "programming ii", "second programming", "coding course"]
//   },
//   {
//     title: "Follow the CCSE Instagram",
//     description: "Stay updated with events and opportunities @ksuccse.",
//     stage: "Freshman–Senior",
//     autoKeywords: ["instagram", "social media", "ccse", "ksuccse", "follow us"]
//   },
//   {
//     title: "Participate in your First CCSE Fall Ideathon",
//     description:
//       "Collaborate in diverse teams to solve creative challenges—no coding required!",
//     stage: "Freshman–Senior",
//     autoKeywords: ["ideathon", "ccse", "innovation", "challenge", "creative competition"]
//   },
//   {
//     title: "Sign up to be a Peer Mentor in the CCSE Mentoring Program",
//     description:
//       "Support new students and develop leadership, time management, and communication skills.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["peer mentor", "ccse mentor", "mentorship", "mentor program", "student mentor"]
//   },
//   {
//     title: "Join a Registered Student Organization on OwlLife",
//     description:
//       "Connect with others, build new skills, and have fun while boosting your resume.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["owlife", "student organization", "rso", "student club", "join org"]
//   },
//   {
//     title: "Become a Tutor for CSE 1321/L or CSE 1322/L",
//     description:
//       "Help other students succeed while strengthening your own technical expertise.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["tutor", "tutoring", "cse1321", "cse1322", "academic support"]
//   },
//   {
//     title: "Learn an Industry-Standard Tool or Language",
//     description:
//       "Gain confidence using Git, Python, Java, or SQL for real-world applications.",
//     stage: "Sophomore",
//     autoKeywords: ["git", "python", "java", "sql", "industry tools"]
//   },
//   {
//     title: "Participate in a Volunteer Experience",
//     description:
//       "Make an impact, build soft skills, and connect with others through service.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["volunteer", "service", "community service", "volunteering", "service day"]
//   },
//   {
//     title: "Participate in your First CCSE Spring Hackathon",
//     description:
//       "Collaborate with peers to build something awesome and learn by doing.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["hackathon", "ccse", "coding competition", "spring hackathon", "buildathon"]
//   },

//   // 21–30
//   {
//     title: "Sign up on Handshake",
//     description:
//       "Access jobs, internships, and career events personalized for you.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["handshake", "career services", "jobs", "student employment", "profile setup"]
//   },
//   {
//     title: "Attend a CCSE Employer Networking Night Event (First)",
//     description:
//       "Meet employers face-to-face and make your first professional connections.",
//     stage: "Sophomore",
//     autoKeywords: ["networking night", "employer night", "career networking", "ccse networking", "industry event"]
//   },
//   {
//     title: "Attend a Workshop for the Business Process Management Certificate",
//     description:
//       "Build career-ready skills by attending a BPM for the Modern Professional workshop.",
//     stage: "Sophomore",
//     autoKeywords: ["bpm", "business process", "workshop", "professional development", "certificate workshop"]
//   },
//   {
//     title:
//       "Earn the Business Process Management for the Modern Professional Certificate",
//     description:
//       "Complete all BPM workshops and showcase your certificate on LinkedIn.",
//     stage: "Sophomore–Senior",
//     autoKeywords: ["bpm certificate", "business process", "professional certificate", "career development", "completion"]
//   },
//   {
//     title: "Do a Resume Writing Workshop or Review with CPD",
//     description:
//       "Improve your resume with feedback from Career Planning & Development.",
//     stage: "Junior–Senior",
//     autoKeywords: ["resume workshop", "cpd", "career workshop", "resume review", "professional development"]
//   },
//   {
//     title: "Attend a Second CCSE Employer Networking Night Event",
//     description:
//       "Return to build deeper professional relationships with employers.",
//     stage: "Junior–Senior",
//     autoKeywords: ["networking night", "career night", "employers", "career event", "industry night"]
//   },
//   {
//     title: "Serve as an Officer in a Registered Student Organization",
//     description:
//       "Gain leadership and teamwork experience that stands out on your resume.",
//     stage: "Junior–Senior",
//     autoKeywords: ["officer", "student leader", "rso", "student organization", "leadership"]
//   },
//   {
//     title: "Attend your First Career Fair",
//     description:
//       "Meet recruiters, explore opportunities, and practice professional conversations.",
//     stage: "Junior–Senior",
//     autoKeywords: ["career fair", "job fair", "career expo", "employers", "recruiting event"]
//   },
//   {
//     title: "Develop Your Elevator Pitch",
//     description:
//       "Craft a short and confident self-introduction for professional settings.",
//     stage: "Junior–Senior",
//     autoKeywords: ["elevator pitch", "professional pitch", "career skills", "communication", "self introduction"]
//   },
//   {
//     title: "Do an Internship",
//     description:
//       "Get real-world experience and discover your ideal career path.",
//     stage: "Junior–Senior",
//     autoKeywords: ["internship", "intern", "career experience", "work experience", "industry internship"]
//   },

//   // 31–41
//   {
//     title: "Build a Portfolio of Coding or Class Projects",
//     description:
//       "Showcase your growth and skills through a portfolio website.",
//     stage: "Junior–Senior",
//     autoKeywords: ["portfolio", "projects", "github", "coding portfolio", "showcase"]
//   },
//   {
//     title: "Attend a C-Day Event as a Guest",
//     description:
//       "Explore innovative student projects and network with industry guests.",
//     stage: "Junior–Senior",
//     autoKeywords: ["c-day", "computing showcase", "showcase", "student projects", "ccse event"]
//   },
//   {
//     title: "Set up or Update Your LinkedIn Profile",
//     description:
//       "Build your professional presence online and connect with recruiters.",
//     stage: "Junior–Senior",
//     autoKeywords: ["linkedin", "linkedin profile", "career profile", "professional networking", "linkedin update"]
//   },
//   {
//     title: "Follow the College of Computing & Software Engineering on LinkedIn",
//     description:
//       "Stay informed with the latest news, events, and opportunities.",
//     stage: "Junior–Senior",
//     autoKeywords: ["ccse linkedin", "linkedin", "follow ccse", "professional updates", "college account"]
//   },
//   {
//     title:
//       "Complete the Prerequisite Courses for Your Senior Project or Capstone",
//     description:
//       "Prepare for your capstone and demonstrate readiness to apply your skills.",
//     stage: "Junior",
//     autoKeywords: ["senior project", "capstone", "prerequisites", "capstone prep", "senior readiness"]
//   },
//   {
//     title: "Attend the Senior Cookout Hosted by CPD",
//     description:
//       "Celebrate your progress and connect with other seniors and employers.",
//     stage: "Senior",
//     autoKeywords: ["senior cookout", "cpd", "cookout", "senior event", "celebration"]
//   },
//   {
//     title: "Meet with Your Academic Advisor to Confirm Final Semester Classes",
//     description:
//       "Make sure you're ready to graduate by verifying your last set of courses.",
//     stage: "Senior",
//     autoKeywords: ["advisor", "final semester", "academic advising", "schedule review", "graduation advising"]
//   },
//   {
//     title: "Petition to Graduate",
//     description:
//       "Apply on Owl Express to begin your degree audit and sign up for commencement.",
//     stage: "Senior",
//     autoKeywords: ["petition to graduate", "graduation", "owl express", "degree audit", "commencement"]
//   },
//   {
//     title: "Meet with a Mentor Working in Industry",
//     description:
//       "Gain insight, advice, and connections from a professional in your field.",
//     stage: "Senior",
//     autoKeywords: ["industry mentor", "mentor meeting", "professional mentor", "career guidance", "mentorship"]
//   },
//   {
//     title: "Attend C-Day as a Presenter",
//     description:
//       "Showcase your senior project to faculty, peers, and industry professionals.",
//     stage: "Senior",
//     autoKeywords: ["c-day", "presenter", "project presentation", "ccse showcase", "senior project"]
//   },
//   {
//     title: "Attend Your Commencement Ceremony",
//     description:
//       "Celebrate your academic journey with classmates, family, and faculty.",
//     stage: "Senior",
//     autoKeywords: ["commencement", "graduation ceremony", "graduate", "senior event", "commencement day"]
//   }
// ];

// const createMilestoneItem = async ({ title, description, stage, autoKeywords }) => {
//   if (!title || !description || !stage) {
//     throw new Error("All fields are required");
//   }

//   const milestone = await milestoneModel.create({
//     title,
//     description,
//     stage,
//     autoKeywords,
//   });

//   return milestone;
// }
// for( const item of achieves){
//   await createMilestoneItem({
//     title: item.title,
//     description: item.description,
//     stage: item.stage,
//     autoKeywords: item.autoKeywords
//   });
// }


app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
