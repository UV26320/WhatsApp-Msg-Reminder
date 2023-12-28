import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

// Configure ENV
dotenv.config();


//App config
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// DB config
dbConnect();

const reminderSchema = new mongoose.Schema({
    
    reminderMsg : String,
    remindAt : String,
    isReminded : Boolean
})

const Reminder = new mongoose.model("Reminder", reminderSchema)

//API routes

app.get('/getAllReminders', (req, res) =>{

})

app.post('/addReminder', (req, res) =>{

})

app.post('/deleteReminder', (req,res) => {

})

app.get('/',(req,res) => {
    res.send("All set done")
})

app.listen(9000, ()=> 
 console.log("server is ready"))