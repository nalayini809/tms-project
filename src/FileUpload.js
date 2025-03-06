import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ task, updateTask }) {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(task.attachment || '');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData);
      const uploadedFileUrl = response.data.filePath; // Assuming backend returns the file URL
      setFileUrl(uploadedFileUrl);

      // Update task with the file URL
      updateTask({ ...task, attachment: uploadedFileUrl });
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  return (
    <div>
      <h4>Upload Attachment</h4>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>

      {fileUrl && (
        <div>
          <h5>Uploaded File:</h5>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
