import './App.css';
import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import TodoTable from './TodoTable';

function App() {
  const [todo, setTodo] = useState({description: '', date: ''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: ''});
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }

  return (
    <div className="App">
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;

/*
import './App.css';
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddTodo from './AddTodo';

//Bookstore Firebase database
//https://bookstore-57892-default-rtdb.europe-west1.firebasedatabase.app/books/.json
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
   fetch('https://bookstore-57892-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
   .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setTodos(valueKeys);
  }

  const addTodo = (newTodo) => {
    fetch('https://bookstore-57892-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    fetch(`https://bookstore-57892-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

//ColumnDefs works in AgGridColumn's place
const columnDefs = [
  { field: 'title', suppressMovable: true, animateRows:true, sortable:true, filter:true},
  { field: 'author', suppressMovable: true, animateRows:true, sortable:true, filter:true},
  { field: 'year', suppressMovable: true, animateRows:true, sortable:true, filter:true},
  { field: 'isbn', suppressMovable: true, animateRows:true, sortable:true, filter:true},
  { field: 'price', suppressMovable: true, animateRows:true, sortable:true, filter:true},
  { field: 'id', width: 90, suppressMovable: true, animateRows:true, sortable:true, filter:true, 
  cellRenderer: params => 
  <><IconButton onClick={() => deleteTodo(params.value)} size="small" color="error">
    <DeleteIcon/>
  </IconButton></>,
  }
];

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{margin: 'auto'}}>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar> 
      <AddTodo addTodo={addTodo} />  
      <div className="ag-theme-material" style={ { height: 400, width: 1200, margin: 'auto' } }>
        <AgGridReact rowData={todos} columnDefs={columnDefs} suppressMovable={true} animateRows={true} sortable={true} filter={true}></AgGridReact>
      </div>
    </div>
   );
}

export default App;
*/