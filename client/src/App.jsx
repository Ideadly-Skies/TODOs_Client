import './App.css';

import Header from './components/Header';
import Form from './components/Form';
import TODOList from './components/TodoList';
import TODOHero from './components/TODOHero';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  async function fetchTodos() {
    let url = `https://todos-json-server-sandy.vercel.app/todos`;
    try {
      const response = await fetch(url)
      if (!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }      

      const json = await response.json()
      setTodos(json)
    } catch (error){
      console.error(error.message)
    }
  }

  // compute completed and total todos
  const todos_completed = todos.filter(
    (todo) => todo.completed === true
  ).length;
  const total_todos = todos.length; 

  useEffect(() => {
    fetchTodos()
  }, [])
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTodos = todos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  return (
    <>
      <div className='wrapper'>
        <Header />
        <TODOHero todos_completed={todos_completed} total_todos={total_todos}/>
        <Form todos={todos} setTodos={setTodos} setCurrentPage={setCurrentPage} ITEMS_PER_PAGE={ITEMS_PER_PAGE}/>
        <TODOList todos={currentTodos} setTodos={setTodos} currentPage={currentPage} setCurrentPage={setCurrentPage} ITEMS_PER_PAGE={ITEMS_PER_PAGE}/>

        {/* Pagination Controls */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span style={{ color: 'white' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> 
    </>
  );
}

export default App;