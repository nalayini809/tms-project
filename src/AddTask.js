import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaClipboardList, FaCalendarAlt, FaFlag, FaPaperclip, FaList, FaTags, FaClock } from "react-icons/fa";

const AddTask = ({ onAddTask }) => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("None");
  const [attachments, setAttachments] = useState([]);
  const [subtasks, setSubtasks] = useState([{ name: "", completed: false }]);
  const [list, setList] = useState("");
  const [tags, setTags] = useState("");
  const [reminder, setReminder] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
    if (!taskName.trim()) {
      alert("Task name is required!");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      notes,
      dueDate,
      priority,
      attachments,
      subtasks,
      list,
      tags: tags.split(",").map(tag => tag.trim()),
      reminder,
      created: new Date().toLocaleString(),
    };

    onAddTask(newTask);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Add Task</h2>
        <div style={styles.formContainer}>
          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaPen style={styles.icon} /> Task Name:</label>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required style={styles.input} />
          </div>

          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaClipboardList style={styles.icon} /> Notes:</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={styles.textarea} />
          </div>

          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaCalendarAlt style={styles.icon} /> Due Date:</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={styles.input} />
          </div>

          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaFlag style={styles.icon} /> Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.input}>
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaPaperclip style={styles.icon} /> Attachments:</label>
            <input type="file" multiple onChange={(e) => setAttachments([...e.target.files])} style={styles.input} />
          </div>

         
          <div style={styles.formGroup}>
            <label style={styles.label}><FaList style={styles.icon} /> Subtasks:</label>
            {subtasks.map((subtask, index) => (
              <div key={index} style={styles.subtaskContainer}>
                <input type="text" placeholder="Subtask name" value={subtask.name} onChange={(e) => {
                  const newSubtasks = [...subtasks];
                  newSubtasks[index].name = e.target.value;
                  setSubtasks(newSubtasks);
                }} style={styles.input} />
              </div>
            ))}
          </div>

          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaList style={styles.icon} /> List:</label>
            <select value={list} onChange={(e) => setList(e.target.value)} style={styles.input}>
              <option value="">Select List</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
            </select>
          </div>

          
          <div style={styles.formGroup}>
            <label style={styles.label}><FaTags style={styles.icon} /> Tags:</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Comma separated" style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaClock style={styles.icon} /> Reminder:</label>
            <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} style={styles.input} />
          </div>

          <button onClick={handleSubmit} style={{ ...styles.button, backgroundColor: isHovered ? "#ffb300" : "#ffcc00" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;


const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      minHeight: "100vh",
      padding: "20px",
      background: "url('https://img.freepik.com/free-photo/laptop-office-plant-black-background-top-view_169016-34505.jpg') center/cover no-repeat",
    },
  
  formWrapper: {
    background: "rgba(255, 255, 255, 0.98)",
    padding: "30px",
    backgroundImage: "url('https://marketplace.canva.com/EAF7OwFjyrQ/2/0/900w/canva-pink-white-elegant-watercolor-background-instagram-story-aQdILQVO6Lc.jpg')",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "90%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    marginRight: "10px",
    color: "red",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  button: {
    border: "none",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "center",
  },
};
