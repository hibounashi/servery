import express from "express";
import Subject from "../models/timer.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/addsubject", authenticateUser, async (req, res) => {
  const { subject } = req.body;
  const userId = req.user._id; 

  try {
    const newSubject = new Subject({
      userId,
      subject,
    });

    await newSubject.save();
    res.status(200).json({ message: "Subject added successfully", subject: newSubject });
  } catch (error) {
    res.status(500).json({ error: "Error adding new Subject" });
  }
});

export default router;