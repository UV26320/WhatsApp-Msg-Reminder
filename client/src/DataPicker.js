import React from "react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

function DataPicker() {
  const [remindAt, setRemindAt] = useState(new Date());
  return (
    <div>
      <DateTimePicker className="p-5"
       value={remindAt} 
       onChange={setRemindAt} />
    </div>
  );
}

export default DataPicker;
