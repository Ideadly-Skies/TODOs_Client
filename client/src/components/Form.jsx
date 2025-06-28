function Form({ todos, setTodos }) {
  async function addTodo({newTodo}){
    try {
      const url = `http://localhost:3000/todos`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': newTodo.id,
          'todo': newTodo.todo,
          'completed': newTodo.completed,
          'userId': newTodo.userId,
        }) 
      })

      if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }

    } catch (error) {
      console.error(error.message)
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = event.target.todo.value;
    const newTodo = {
      todo: value,
      id: todos.length > 0 ? todos[todos.length - 1].id : 1,
      completed: false,
      userId: todos.length > 0 ? todos[todos.length - 1].userId : 1,
    };
    
    try {
      // persist to do in json server
      await addTodo({ newTodo });

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      event.target.reset();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>

      <button>
        <span className="visually-hidden">Submit</span>
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
        >
          <path
            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </form>
  );
}

export default Form;