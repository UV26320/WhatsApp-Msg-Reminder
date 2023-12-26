require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//App config

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// DB config

mongoose.connect('mongodb://127.0.0.1:27017/reminderAppDB' , { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
}, () => console.log('db connection established'))

const reminderSchema = new mongoose.Schema({
    
    reminderMsg : String,
    remindAt : String,
    isReminded : Boolean
})

const Reminder = new mongoose.model("Reminder", reminderSchema)