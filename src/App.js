import React, { useState } from 'react';
import './App.css'; // Import your CSS file

// Button Component
function Button({ onClick, text }) {
  return <button class = "btn btn-grad" onClick={onClick}>{text}</button>;
}

// TodoItem Component
function TodoItem({ todo, onEdit }) {
  return (
    <div>
      <p>Title: {todo.title}</p>
      <p>Deadline: {todo.deadline}</p>
      <p>Status: {todo.status}</p>
      <Button onClick={() => onEdit(todo.id)} text="Edit" />
    </div>
  );
}

// TodoList Component
function TodoList({ todos, onEdit }) {
  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
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
          <h2>{todoToEdit ? 'Edit Todo' : 'Add Todo'}</h2>
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
          <Button onClick={handleSave} text={todoToEdit ? 'Save' : 'Add'} />
          <Button onClick={handleClear} text="Clear" />

        </div>
      )}
    </div>
  );
}

// App Component
function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const addTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now() }]);
    setFormOpen(false);
  };

  const editTodoItem = (editedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
    setEditTodo(null);
    setFormOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setFormOpen(true)} text="Add Todo" />
      <TodoForm
        onAdd={addTodo}
        todoToEdit={editTodo}
        onEdit={editTodoItem}
        isOpen={formOpen}
        toggleForm={() => setFormOpen(!formOpen)}
      />
      <TodoList todos={todos} onEdit={setEditTodo} />
    </div>
  );
}

export default App;
