import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  reminderMsg: String,
  remindAt: String,
  isReminded: Boolean,
});

export default mongoose.model("Reminder", reminderSchema);
