import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, action, questionData, onSave }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [options, setOptions] = useState(['']);

  useEffect(() => {
    if (action === 'edit' && questionData) {
      setQuestionText(questionData.text);
      setQuestionType(questionData.type);
      setOptions(questionData.options || ['']);
    }
  }, [action, questionData]);

  const handleSave = () => {
    const newQuestion = {
      text: questionText,
      type: questionType,
      options: options.filter(option => option),
    };
    onSave(newQuestion);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{action === 'add' ? 'Add Question' : 'Edit Question'}</h2>
        
        <input
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        
        <div>
          <label>Type:</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="mcq">Multiple Choice</option>
          </select>
        </div>
        
        {questionType === 'mcq' && (
          <div>
            <h3>Options:</h3>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button onClick={() => handleDeleteOption(index)}>Delete</button>
              </div>
            ))}
            <button onClick={handleAddOption}>Add Option</button>
          </div>
        )}

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Modal;
