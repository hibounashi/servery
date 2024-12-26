import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Make name required
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: false},
  googleId: { type: String, unique: true, sparse: true }, // Ensure googleId is unique only when not null
  displayName: { type: String } // Add displayName field
});

// Remove the explicit index creation for googleId
// UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });

const User = mongoose.model("User", UserSchema);
export default User;
