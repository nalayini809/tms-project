import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaPen, FaClipboardList, FaCalendarAlt, FaFlag, FaPaperclip, FaList, FaTags, FaClock } from "react-icons/fa"; // import icons

const TaskDetails = ({ tasks, onEditTask, onDeleteTask }) => {
  const { id } = useParams();
  
  const location = useLocation();
  const navigate = useNavigate();

  const existingTask = location.state?.task || tasks.find((t) => t.id === Number(id));

  
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(existingTask?.name || "");
  const [notes, setNotes] = useState(existingTask?.notes || "");
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
  const [priority, setPriority] = useState(existingTask?.priority || "None");
  const [attachments, setAttachments] = useState(existingTask?.attachments || []);
  const [subtasks, setSubtasks] = useState(existingTask?.subtasks || []);
  const [list, setList] = useState(existingTask?.list || "");
  const [tags, setTags] = useState(existingTask?.tags.join(", ") || "");
  const [reminder, setReminder] = useState(existingTask?.reminder || "");

  if (!existingTask) {
    return <h2>Task not found</h2>;
  }

  const handleSave = () => {
    const updatedTask = {
      ...existingTask,
      name: taskName,
      notes,
      dueDate,
      priority,
      attachments,
      subtasks,
      list,
      tags: tags.split(",").map(tag => tag.trim()),
      reminder,
    };
    if (existingTask?.id) {
      // Update existing task
      onEditTask(updatedTask);
    } else {
      // Save new task and navigate to its detail page
      onEditTask(updatedTask); // Assuming onEditTask is creating the task
      navigate(`/task-details/${updatedTask.id}`); // Navigate to the new task details page
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(existingTask.id);
    navigate("/dashboard");
  };
  const handleAttachmentChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubtaskChange = (index, field, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index][field] = value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: "", completed: false }]);
  };
  


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isEditing ? "Edit Task" : "Task Details"}</h2>

      {isEditing ? (
        <div>
          <div style={styles.formGroup}>
            <label style={styles.label}><FaPen style={styles.icon} /> Task Name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaClipboardList style={styles.icon} /> Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaCalendarAlt style={styles.icon} /> Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaFlag style={styles.icon} /> Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={styles.input}
            >
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaPaperclip style={styles.icon} /> Attachments:</label>
            <input
              type="file"
              multiple
              onChange={handleAttachmentChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaList style={styles.icon} /> Subtasks:</label>
            {subtasks.map((subtask, index) => (
              <div key={index} style={styles.subtaskContainer}>
                <input
                  type="text"
                  placeholder="Subtask name"
                  value={subtask.name}
                  onChange={(e) => handleSubtaskChange(index, "name", e.target.value)}
                  style={styles.input}
                />
                <label style={styles.checkboxLabel}>
                  Completed:
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={(e) => handleSubtaskChange(index, "completed", e.target.checked)}
                    style={styles.checkbox}
                  />
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubtask}
              style={styles.button}
            >
              Add Subtask
            </button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaList style={styles.icon} /> List:</label>
            <select
              value={list}
              onChange={(e) => setList(e.target.value)}
              style={styles.input}
            >
              <option value="">Select List</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaTags style={styles.icon} /> Tags:</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Comma separated"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaClock style={styles.icon} /> Reminder:</label>
            <input
              type="datetime-local"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            onClick={handleSave}
            style={styles.saveButton}
          >
            Save Task
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {taskName}</p>
          <p><strong>Notes:</strong> {notes}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
          <p><strong>Priority:</strong> {priority}</p>
          <p><strong>Attachments:</strong> {attachments.length} files</p>
          <p><strong>Subtasks:</strong> {subtasks.filter(sub => sub.completed).length}/{subtasks.length}</p>
          <p><strong>List:</strong> {list}</p>
          <p><strong>Tags:</strong> {tags}</p>
          <p><strong>Reminder:</strong> {reminder}</p>

          <div style={styles.buttonContainer}>
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>Edit Task</button>
            <button onClick={handleDelete} style={styles.deleteButton}>Delete Task</button>
            <button onClick={() => navigate("/dashboard")} style={styles.goBackButton}>Go Back</button>
           
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    background: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    color: "#333",
  },
  icon: {
    marginRight: "10px",
    color: "#5c6368", // Icon color
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "80px",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  saveButton: {
    background: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    background: "blue",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  goBackButton: {
    background: "gray",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  subtaskContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  checkbox: {
    transform: "scale(1.2)",
  },
};

export default TaskDetails;