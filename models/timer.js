import mongoose from "mongoose"

const TimerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },

  subject: { 
    type: String, 
    required: true },

  focusTime: { 
    type: Number, 
    required: true }, // in minutes
  
  elapsedTime: {
    type: Number, 
    required: true
  },

  breakTime: { 
    type: Number, 
    required: true }, // in minutes

  totalStudyTime: { 
    type: Number, 
    default: 0 },

  isSessionActive: { 
    type: Boolean, 
    default: false },

  sessionStartTime: { 
    type: Date, 
    default: Date.now },

  sessionEndTime: { 
    type: Date },

})

const Timer = mongoose.model("Timer", TimerSchema)
export default Timer