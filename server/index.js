import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbconnection.js";
import reminderModel from "./Module/reminderModel.js";
import Reminder from "./Module/reminderModel.js";
import cron from "node-cron";


// Configure ENV
dotenv.config();

//App config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB config
dbConnect();

//Whatsapp reminding functionality
const sendReminders = async () => {
  try {
    const reminderList = await Reminder.find({
      isReminded: false,
      remindAt: { $lte: new Date() },
    });

    for (const reminder of reminderList) {
      await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });

      const accountSid = process.env.ACCOUNT_SID;
      const authToken = process.env.AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);

      await client.messages.create({
        body: reminder.reminderMsg,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${reminder.userPhoneNumber}`,
      });
    }
  } catch (err) {
    console.error("Error:", err);
    // Handle errors as needed (retry, log, etc.)
  }
};

// Schedule the reminder check every minute using node-cron
cron.schedule("* * * * *", () => {
  sendReminders();
});


//API routes
app.get("/getAllReminders", async (req, res) => {
  try {
    const reminderList = await Reminder.find({});
    res.send(reminderList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addReminder", async (req, res) => {
  try {
    const { reminderMsg, remindAt } = req.body;
    const reminder = new Reminder({
      reminderMsg,
      remindAt,
      isReminded: false,
    });

    await reminder.save();
    const reminderList = await Reminder.find({});
    res.send(reminderList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deleteReminder", async (req, res) => {
  try {
    const { id } = req.body;
    await Reminder.deleteOne({ _id: id });
    const reminderList = await Reminder.find({});
    res.send(reminderList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Port
const PORT = process.env.PORT || 9000;

// Run Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} at PORT ${PORT}`);
});
