import React, { useState } from "react";
import AddTask from "./AddTask";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the tasks array
  };

  return (
    <div>
      <AddTask tasks={tasks} setTasks={setTasks} onAddTask={handleAddTask} />
    </div>
  );
};

export default TaskList;
