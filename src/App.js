import React, { useState } from 'react';
import './App.css'; // Import your CSS file

// Button Component
function Button({ onClick, text }) {
  return <button class = "btn btn-grad" onClick={onClick}>{text}</button>;
}

// TodoItem Component
function TodoItem({ todo }) {
  return (
    <div>
      <p>Title: {todo.title}</p>
      <p>Deadline: {todo.deadline}</p>
      <p>Status: {todo.status}</p>
    </div>
  );
}

// TodoList Component
function TodoList({ todolist }) {
  return (
    <div>
      <h2>Todo List</h2>
      {todolist.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

// TodoForm Component
function TodoForm({ onAdd, todoToEdit, onEdit, isOpen, toggleForm }) {
  const [title, setTitle] = useState(todoToEdit ? todoToEdit.title : '');
  const [deadline, setDeadline] = useState(todoToEdit ? todoToEdit.deadline : '');
  const [status, setStatus] = useState(todoToEdit ? todoToEdit.status : 'not started');

  const handleSave = () => {
    if (todoToEdit) {
      onEdit({ id: todoToEdit.id, title, deadline, status });
    } else {
      onAdd({ title, deadline, status });
    }

    // Clear the form
    handleClear();
  };

  const handleClear = () => {
   
    // Clear the form
    setTitle('');
    setDeadline('');
    setStatus('not started');
  };


  return (
    <div>
      {isOpen && (
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          <label>
            Deadline:
            <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </label>
          <br />
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <br />
          <Button onClick={handleSave} text="Add"/>
          <Button onClick={handleClear} text="Clear" />

        </div>
      )}
    </div>
  );
}

// App Component
function App() {
  const [todolist, settodolist] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  const addTodo = (newTodo) => {
    settodolist([...todolist, { ...newTodo, id: Date.now() }]);
    setFormOpen(false);
  };


  return (
    <div>
      <Button onClick={() => setFormOpen(true)} text="Add Todo" />
      <TodoForm
        onAdd={addTodo}
        isOpen={formOpen}
        toggleForm={() => setFormOpen(!formOpen)}
      />
      <TodoList todolist={todolist} />
    </div>
  );
}

export default App;
