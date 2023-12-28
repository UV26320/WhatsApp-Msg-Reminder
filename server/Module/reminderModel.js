import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  reminderMsg: {
    type: String,
  },
  remindAt: {
    type: String,
  },
  isReminded: {
    type: Boolean,
  },
});

export default mongoose.model("Reminder", reminderSchema);
