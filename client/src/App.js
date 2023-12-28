import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DataPicker from "./DataPicker";

function App() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/getAllReminder")
      .then((res) => {
        setReminderList(res.data);
      })
      .catch((error) => {
        // Handle error, log it, or set a default value for reminderList
        console.error("Error fetching reminders:", error);
      });
  }, []);

  const addReminder = () => {};

  const deleteReminder = () => {};

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_Header">
          <h1>Remind Me 🙋🏻‍♂️</h1>
          <input
            type="text"
            placeholder="Reminder Text here...."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />
          <DataPicker></DataPicker>
          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
