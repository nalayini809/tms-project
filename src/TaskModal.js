import React, { useState } from "react";

const TaskModal = ({ isOpen, closeModal, task, saveTask }) => {
  const [taskName, setTaskName] = useState(task ? task.name : "");
  const [taskDescription, setTaskDescription] = useState(task ? task.description : "");

  const handleSave = () => {
    const updatedTask = { name: taskName, description: taskDescription };
    saveTask(updatedTask);
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <input
            type="text"
            className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskModal;
