import React, { useState } from 'react';

function RecurringTask({ task, updateTask }) {
  const [recurrence, setRecurrence] = useState(task.recurrence || 'None');

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
    updateTask({ ...task, recurrence: e.target.value });
  };

  return (
    <div>
      <h4>Set Recurrence</h4>
      <select value={recurrence} onChange={handleRecurrenceChange}>
        <option value="None">None</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
    </div>
  );
}

export default RecurringTask;
