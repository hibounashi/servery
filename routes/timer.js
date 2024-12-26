import express from "express";
import Timer from "../models/timer.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/start", authenticateUser, async (req, res) => {
  const { focusTime, breakTime, subject } = req.body;
  const userId = req.user._id; 

  try {
    // creating a new session for the timer 
    const newTimer = new Timer({
      userId,
      subject,
      focusTime,
      breakTime,
      sessionStartTime: new Date(),
      sessionEndTime: null,
      isSessionActive: true,
      elapsedTime: 0,
    });

    await newTimer.save();
    res.status(200).json({ message: "Timer started successfully", timer: newTimer });
  } catch (error) {
    res.status(500).json({ error: "Error starting timer" });
  }
});

router.post("/pause", authenticateUser, async (req, res) => {
  const userId = req.user._id;
  try {
    const timer = await Timer.findOne({ userId, isSessionActive: true });

    if (!timer) {
      return res.status(404).json({ error: "No active session found" });
    }

    timer.isSessionActive = false;
    timer.sessionEndTime = new Date();
    
    const elapsedTime = (timer.sessionEndTime - timer.sessionStartTime) / (1000 * 60); // Convert to minutes
    timer.elapsedTime = elapsedTime;

    await timer.save();
    res.status(200).json({ message: "Timer paused", timer });
  } catch (error) {
    res.status(500).json({ error: "Error pausing timer" });
  }
});


router.post("/resume", authenticateUser, async (req, res) => {
    const userId = req.user._id;
    try {
      const timer = await Timer.findOne({ userId, isSessionActive: false }).sort({ sessionEndTime: -1 });
  
      if (!timer) {
        return res.status(404).json({ error: "No paused session found" });
      }
  
      const remainingFocusTime = timer.focusTime - timer.elapsedTime;
      timer.isSessionActive = true;
      timer.sessionStartTime = new Date();
      timer.sessionEndTime = null;
      timer.elapsedTime = 0;
  
      await timer.save();
      res.status(200).json({
        message: "Timer resumed",
        remainingFocusTime,
      });
    } catch (error) {
      res.status(500).json({ error: "Error resuming timer" });
    }
  });
  

router.post("/finish", authenticateUser, async (req, res) => {
  const userId = req.user._id;
  try {
    const timer = await Timer.findOne({ userId, isSessionActive: true });

    if (!timer) {
      return res.status(404).json({ error: "No active session found" });
    }

    timer.isSessionActive = false;
    timer.sessionEndTime = new Date();

    timer.totalStudyTime += timer.focusTime;

    timer.elapsedTime = 0;
    timer.sessionStartTime = null;
    timer.sessionEndTime = null;

    await timer.save();

    res.status(200).json({
      message: "Timer finished",
      totalStudyTime: timer.totalStudyTime,
    });
  } catch (error) {
    res.status(500).json({ error: "Error finishing timer" });
  }
});  

// Get Total Study Time
router.get("/total-study-time", authenticateUser, async (req, res) => {
  const userId = req.user._id;

  try {
    const timer = await Timer.findOne({ userId }).sort({ sessionStartTime: -1 }).limit(1);
    if (!timer) {
      return res.status(404).json({ error: "No study session found" });
    }

    res.status(200).json({ totalStudyTime: timer.totalStudyTime });
  } catch (error) {
    res.status(500).json({ error: "Error fetching total study time" });
  }
});

export default router;
