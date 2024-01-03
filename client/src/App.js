import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const getDefaultDateTime = () => {
    const defaultTime = "12:00";
    const today = new Date().toISOString().split("T")[0];
    return `${today}T ${defaultTime}`;
  };

  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(getDefaultDateTime());
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/getAllReminder")
      .then((res) => {
        console.log(res.data)
        setReminderList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reminders:", error);
      });
  }, []);

  const addReminder = async () => {
    if (!reminderMsg || !remindAt) {
      alert("Please fill in both fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:9000/addReminder", {
        reminderMsg,
        remindAt,
      });
      setReminderList(response.data);
      setReminderMsg("");
      setRemindAt("");
      alert("Your Data has been added");
    } catch (error) {
      console.error("Error:", error);
      // You might want to set an error state to display a user-friendly error message
      // setErrorState('Failed to add reminder. Please try again.');
    }
  };

  const deleteReminder = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reminder?");
    
    if (confirmDelete) {
      axios.post("http://localhost:9000/deleteReminder", { id })
        .then(res => setReminderList(res.data))
        .catch(error => {
          // Handle error if the deletion fails
          console.error("Failed to delete reminder:", error);
          // Optionally notify the user about the failure
        });
    } else {
      // Optionally, inform the user that the reminder was not deleted
      console.log("Reminder deletion cancelled by the user.");
      // You might want to perform some action or notify the user here
    }
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

        <div className="homepage_body">
          {reminderList.map((reminder) => (
            <div className="reminder_card" key={reminder._id}>
              <h2>{reminder.reminderMsg}</h2>
              <h3>Remind Me at:</h3>
              <p>
                {String(
                  new Date(
                    reminder.remindAt.toLocaleString(undefined, {
                      timezone: "Asia/Kolkata",
                    })
                  )
                )}
              </p>
              <div
                className="button"
                onClick={() => deleteReminder(reminder._id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
