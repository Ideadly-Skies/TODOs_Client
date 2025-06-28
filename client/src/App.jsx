import './App.css';

import Header from './components/Header';
import Form from './components/Form';
import TODOList from './components/TodoList';
import TODOHero from './components/TODOHero';

function App() {

  return (
    <>
      <div className='wrapper'>
        <Header />
        <TODOHero todos_completed={0} total_todos={0}/>
        <Form />
        <TODOList todos={[]} />
      </div> 
    </>
  );
}

export default App;