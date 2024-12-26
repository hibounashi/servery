import 'dotenv/config';
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import connectToMongoDB from "./db/db.js";
import userRoutes from "./routes/auth.js";
import taskRouter from "./routes/tasks.cjs";
import timerRoutes from "./routes/timer.js";
import subjectRoutes from "./routes/subject.js";

import "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", userRoutes);
app.use("/api/tasks", taskRouter); // Utilisez le routeur de server.cjs
app.use("/timer", timerRoutes);
app.use("/timer/subject", subjectRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// The URLs of the APIs 
// http://localhost:5000/timer/start : for starting a new timer 
// http://localhost:5000/timer/pause : for pausing a running timer 
// http://localhost:5000/timer/resume : for resuming a stopped timer 
// http://localhost:5000/timer/finish : when the timer finishes
// http://localhost:5000/timer/total-study-time : for retreiving the total study time 
// http://localhost:5000/timer/subject/addSubject : for adding a new subject to the database of the user