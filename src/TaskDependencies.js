import React, { useState } from 'react';

function TaskDependencies({ tasks, task, updateTask }) {
  const [dependency, setDependency] = useState(task.dependency || '');

  const handleDependencyChange = (e) => {
    setDependency(e.target.value);
    updateTask({ ...task, dependency: e.target.value });
  };

  return (
    <div>
      <h4>Set Dependency</h4>
      <select value={dependency} onChange={handleDependencyChange}>
        <option value="">None</option>
        {tasks.map((t) => (
          <option key={t.id} value={t.id}>
            {t.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskDependencies;
