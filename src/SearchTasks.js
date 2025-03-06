import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SearchTasks = ({ onSelectTask }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("adminTasks")) || [];
    setTasks(storedTasks);
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <h2>Search Tasks</h2>
      <SearchInput
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TaskList>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} onClick={() => onSelectTask(task)}>
              {task.title} - <strong>{task.category}</strong>
            </TaskItem>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </TaskList>
    </Container>
  );
};


const Container = styled.div`
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  margin: 10px 0;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default SearchTasks;
