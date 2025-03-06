import React, { useState } from 'react';

function Subtasks({ task, updateTask }) {
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');

  const handleSubtaskChange = (e) => {
    setNewSubtask(e.target.value);
  };

  const addSubtask = () => {
    if (newSubtask) {
      const updatedSubtasks = [...subtasks, { title: newSubtask, completed: false }];
      setSubtasks(updatedSubtasks);
      updateTask({ ...task, subtasks: updatedSubtasks }); // Propagate change to parent task component
      setNewSubtask('');
    }
  };

  const toggleCompletion = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);
    updateTask({ ...task, subtasks: updatedSubtasks }); // Propagate change to parent task component
  };

  return (
    <div>
      <h4>Subtasks</h4>
      <ul>
        {subtasks.map((subtask, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => toggleCompletion(index)}
            />
            {subtask.title}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newSubtask}
        onChange={handleSubtaskChange}
        placeholder="Add a new subtask"
      />
      <button onClick={addSubtask}>Add Subtask</button>
    </div>
  );
}

export default Subtasks;
