import './App.css';

import Header from './components/Header';
import Form from './components/Form';
import TODOList from './components/TodoList';
import TODOHero from './components/TODOHero';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([])

  async function fetchTodos() {
    let url = `http://localhost:3000/todos`;
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

  useEffect(() => {
    fetchTodos()
  }, [])
  
  return (
    <>
      <div className='wrapper'>
        <Header />
        <TODOHero todos_completed={0} total_todos={0}/>
        <Form todos={todos} setTodos={setTodos}/>
        <TODOList todos={todos} setTodos={setTodos} />
      </div> 
    </>
  );
}

export default App;