import React, { useState } from 'react';
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Popover,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

// TodoItem Component
function TodoItem({ todo,onEdit  }) {
  // Define icons for each status
  const statusIcons = {
    'not started': <ErrorIcon sx={{ color: 'red' }} />,
    'in progress': <WarningIcon sx={{ color: 'yellow' }} />,
    'done': <CheckCircleIcon sx={{ color: 'green' }} />,
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>

        </div>
        <Typography variant="body2">{statusIcons[todo.status]}Title: {todo.title}</Typography>
        <Typography variant="body2">{statusIcons[todo.status]} Deadline: {todo.deadline}</Typography>
        <Button onClick={() => onEdit(todo)}>Edit</Button> {/* Pass the entire todo as a parameter */}
      </CardContent>
    </Card>
  );
}

// TodoList Component
function TodoList({ todolist, onEdit  }) {
  return (
    <div>
      <Typography sx={{ marginY: 2 }} variant="h6">
        Todo List
      </Typography>
      {todolist.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
      <p><ErrorIcon sx={{ color: 'red' }} />not started {"\t\t\t\t\t"}  <WarningIcon sx={{ color: 'yellow' }} />in progress <CheckCircleIcon sx={{ color: 'green' }} />done</p>
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
      onEdit({ ...todoToEdit, title, deadline, status }); // Include all properties of the todo
    } else {
      onAdd({ title, deadline, status });
    }

    // Clear the form
    handleClear();
  };

  const handleClear = () => {
    setTitle('');
    setDeadline('');
    setStatus('not started');
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: '20px',
  };

  return (
    <Box style={formContainerStyle}>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Title:</InputLabel>
        <Input id="component-simple" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl sx={{ marginTop: '10px' }} variant="standard">
        <InputLabel htmlFor="component-simple">Deadline:</InputLabel>
        <Input id="component-simple" type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </FormControl>
      <FormControl sx={{ marginTop: '10px' }} variant="standard">
        <InputLabel htmlFor="status-select">Status:</InputLabel>
        <Select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="not started">Not Started</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Button sx={{ marginRight: '20px' }} variant="contained" onClick={handleSave}>
          Add
        </Button>
        <Button variant="contained" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}

// App Component
function App() {
  const [todolist, settodolist] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [formOpen, setFormOpen] = useState(null);

  const addTodo = (newTodo) => {
    settodolist([...todolist, { ...newTodo, id: Date.now() }]);
    setFormOpen(null);
  };

  const editTodoItem = (editedTodo) => {
    const updatedTodos = todolist.map((todo) =>
    todo.id === editedTodo.id ? editedTodo : todo
    );
    settodolist(updatedTodos);
    setEditTodo(null);
    setFormOpen(false);
  };



  const open = Boolean(formOpen);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          margin: '20px',
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Hi Shashi, Let's add a new To Do!
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{ margin: '20px', alignSelf: 'center' }}
              onClick={(e) => setFormOpen(e.currentTarget)}
            >
              Add To Do
            </Button>
          </CardActions>
        </Card>
        <Popover
          id={id}
          open={open}
          anchorEl={formOpen}
          todoToEdit={editTodo}
          onEdit={editTodoItem}  
          onClose={() => setFormOpen(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <TodoForm onAdd={addTodo} isOpen={open} todoToEdit={editTodo} onEdit={editTodoItem} toggleForm={() => setFormOpen(!formOpen)}

 />
        </Popover>
        <TodoList todolist={todolist} onEdit={setEditTodo} />
      </Box>
    </div>
  );
}

export default App;
