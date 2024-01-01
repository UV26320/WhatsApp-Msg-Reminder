import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbconnection.js";
import reminderModel from "./Module/reminderModel.js";
import Reminder from "./Module/reminderModel.js";


// Configure ENV
dotenv.config();

//App config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB config
dbConnect();

// Create a new reminder and save it to the database
// const newReminder = new Reminder({
//   reminderMsg: "Don't forget!",
//   remindAt: new Date(),
//   isReminded: false
// });

// newReminder.save()
//   .then(savedReminder => {
//     console.log('Reminder saved:', savedReminder);
//   })
//   .catch(error => {
//     console.error('Error saving reminder:', error.message);
//   });


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
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} at PORT ${PORT}`);
});

