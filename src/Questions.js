import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTaskContext } from './TaskContext';

function Questions() {
  const { currentUser } = useTaskContext();
  const [questions, setQuestions] = useState([]); 
  const [questionModalOpen, setQuestionModalOpen] = useState(false); 
  const [editingQuestion, setEditingQuestion] = useState(null); 
  const [newQuestion, setNewQuestion] = useState(''); 

  
  const addQuestion = () => {
    if (newQuestion.trim() === '') return; 
    setQuestions([...questions, newQuestion]); 
    setNewQuestion(''); 
    setQuestionModalOpen(false); 
  };

  
  const editQuestion = (index) => {
    setEditingQuestion(index); 
    setNewQuestion(questions[index]); 
    setQuestionModalOpen(true); 
  };

  
  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index)); 
  };

  
  const saveEditedQuestion = () => {
    if (newQuestion.trim() === '') return; 
    const updatedQuestions = [...questions];
    updatedQuestions[editingQuestion] = newQuestion; 
    setQuestions(updatedQuestions); 
    setNewQuestion(''); 
    setEditingQuestion(null); 
    setQuestionModalOpen(false); 
  };

  return (
    <div style={styles.container}>
      <h2>Questions</h2>

     
      <div style={styles.questionsBox}>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} style={styles.questionItem}>
              <span>{q}</span>
              {currentUser?.role === 'Admin' && (
                <>
                  <button onClick={() => editQuestion(index)} style={styles.button}>
                    Edit
                  </button>
                  <button onClick={() => deleteQuestion(index)} style={styles.button}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No questions available.</p> 
        )}
      </div>

  
      <Modal
        isOpen={questionModalOpen}
        onRequestClose={() => setQuestionModalOpen(false)} 
        contentLabel="Create/Edit Question"
        style={modalStyles}
      >
        <h3>{editingQuestion === null ? 'Create New Question' : 'Edit Question'}</h3>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)} 
          placeholder="Enter your question"
          style={styles.input}
        />
        <div style={styles.modalButtons}>
          <button
            onClick={editingQuestion === null ? addQuestion : saveEditedQuestion}
            style={styles.modalButton}
          >
            {editingQuestion === null ? 'Submit' : 'Save Changes'}
          </button>
          <button onClick={() => setQuestionModalOpen(false)} style={styles.modalButton}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  questionsBox: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  questionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  modalButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

const modalStyles = {
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    margin: '0 auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

export default Questions;
