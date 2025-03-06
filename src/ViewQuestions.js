import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTaskContext } from './TaskContext';

Modal.setAppElement('#root');

function ViewQuestions({ taskId, isOpen, onClose }) {
  const { tasks } = useTaskContext();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="View Questions"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          width: '500px',
          maxHeight: '80vh',
          overflowY: 'auto',
        },
      }}
    >
      <h2>Questions for Task {taskId}</h2>
      {task.questions && task.questions.length > 0 ? (
        <ul>
          {task.questions.map((q, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{q}</li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this task.</p>
      )}
      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </Modal>
  );
}

export default ViewQuestions;
