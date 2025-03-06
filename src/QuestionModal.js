import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const QuestionModal = ({ isOpen, closeModal, taskId, saveQuestions }) => {
  const [questions, setQuestions] = useState(['']);

  const handleAddQuestion = () => setQuestions([...questions, '']);

  const handleEditQuestion = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => setQuestions(questions.filter((_, i) => i !== index));

  const handleSubmit = () => {
    if (questions.some(q => q.trim() === '')) {
      alert('Please fill in all questions.');
      return;
    }
    saveQuestions(taskId, questions);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles} contentLabel="Add Questions">
      <h2 style={{ textAlign: 'center' }}>Add Questions to Task {taskId}</h2>
      <div style={styles.modalBody}>
        {questions.map((q, index) => (
          <div key={index} style={styles.questionItem}>
            <textarea
              value={q}
              onChange={(e) => handleEditQuestion(index, e.target.value)}
              placeholder="Enter question"
              style={styles.textarea}
            />
            <button onClick={() => handleDeleteQuestion(index)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
        <div style={styles.footer}>
          <button onClick={handleAddQuestion} style={styles.addButton}>Add Another Question</button>
          <button onClick={handleSubmit} style={styles.submitButton}>Save</button>
          <button onClick={closeModal} style={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

const modalStyles = { overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }, content: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', zIndex: 1051 } };

const styles = { modalBody: { padding: '20px' }, questionItem: { marginBottom: '10px' }, textarea: { width: '100%', height: '60px' }, deleteButton: { backgroundColor: '#e74c3c', color: '#fff', marginLeft: '10px' }, footer: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' }, addButton: { backgroundColor: '#2ecc71', color: '#fff' }, submitButton: { backgroundColor: '#3498db', color: '#fff' }, cancelButton: { backgroundColor: '#7f8c8d', color: '#fff' } };


export default QuestionModal;
