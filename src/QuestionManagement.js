import React, { useState } from 'react';
import Modal from './Modal';

const QuestionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('add'); // 'add', 'edit'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

  const openModal = (actionType, question = null) => {
    setAction(actionType);
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveQuestion = (newQuestion) => {
    if (action === 'add') {
      setQuestions([...questions, newQuestion]);
    } else if (action === 'edit' && selectedQuestion) {
      const updatedQuestions = questions.map(q =>
        q === selectedQuestion ? newQuestion : q
      );
      setQuestions(updatedQuestions);
    }
    closeModal();
  };

  const deleteQuestion = (questionToDelete) => {
    const updatedQuestions = questions.filter(q => q !== questionToDelete);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h1>Question Management</h1>
      <button onClick={() => openModal('add')}>Add Question</button>

      <div>
        <h2>Existing Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.text}</p>
            <button onClick={() => openModal('edit', question)}>Edit</button>
            <button onClick={() => deleteQuestion(question)}>Delete</button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        action={action}
        questionData={selectedQuestion}
        onSave={saveQuestion}
      />
    </div>
  );
};

export default QuestionManagement;
