import mongoose from "mongoose"

const SubjectSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },

  subject: { 
    type: String, 
    required: true },

})

const Subject = mongoose.model("Timer", SubjectSchema)
export default Subject