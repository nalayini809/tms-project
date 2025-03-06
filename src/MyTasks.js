import React from "react";

const MyTasks = ({ tasks = [], setSelectedTask }) => {
  const handleTaskClick = (task) => {
    if (setSelectedTask) {
      setSelectedTask(task);
    } else {
      console.error("setSelectedTask is not defined");
    }
  };

  return (
    <div>
      <h3>Create and manage your tasks</h3>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} onClick={() => handleTaskClick(task)} style={{ cursor: "pointer" }}>
              {task}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default MyTasks;
