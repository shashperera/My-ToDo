import React, { useState } from 'react';
import {
  Button,
  AppBar,
  Grid,
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
      <Typography sx={{ margin: '20px' }} variant="h6">
        Todo List
      </Typography>
      {todolist.map((todo) => (
        <TodoItem sx={{ margin: '30px' }} key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

// TodoForm Component
function TodoForm({ onAdd, todoToEdit, onEdit }) {
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
    margin:'20px'
  };

  return (
    <Box style={formContainerStyle}>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Title:</InputLabel>
        <Input id="component-simple" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl sx={{marginTop:'10px'}}variant="standard">
        <InputLabel htmlFor="component-simple">Deadline:</InputLabel>
        <Input id="component-simple" type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </FormControl>
      <FormControl  sx={{marginTop:'10px'}} variant="standard">
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
        <Button sx={{marginRight:'20px'}} variant="contained" onClick={handleSave}>
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
  const [formOpen, setFormOpen] = useState(null);

  const addTodo = (newTodo) => {
    settodolist([...todolist, { ...newTodo, id: Date.now() }]);
    setFormOpen(null);
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
          <TodoForm onAdd={addTodo} isOpen={open} />
        </Popover>
        <TodoList todolist={todolist} />
      </Box>
    </div>
  );
}

export default App;
