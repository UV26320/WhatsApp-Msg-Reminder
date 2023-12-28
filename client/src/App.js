import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(getDefaultDateTime());
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

  function getDefaultDateTime() {
    // Set a default time (e.g., 12:00 PM)
    const defaultTime = "12:00";
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    // Combine default time with current date to match the 'datetime-local' format
    return `${today}T${defaultTime}`;
  }

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
          <div>
            <input
              className="datePicker"
              type="datetime-local"
              onChange={(e) => setRemindAt(e.target.value)}
            />
            <p>Default Selected Date: {remindAt}</p>
          </div>

          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
