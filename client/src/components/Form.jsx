import Swal from 'sweetalert2'

function Form({ todos, setTodos, setCurrentPage, ITEMS_PER_PAGE }) {
  async function addTodo({newTodo}){
    const url = `https://delightful-zigzag-banon.glitch.me/todos`
    
    return await fetch(url, {
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
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const value = event.target.todo.value;
    const newTodo = {
      todo: value,
      id: todos.length > 0 ? String(parseInt(todos[todos.length - 1].id) + 1) : "1",
      completed: false,
      userId: todos.length > 0 ? todos[todos.length - 1].userId : 1,
    };
    
    try {
      const response = await addTodo({ newTodo });

      if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
      }

      setTodos((prevTodos) => {
        const updated = [...prevTodos, newTodo];
        setCurrentPage(Math.ceil(updated.length / ITEMS_PER_PAGE));
        return updated;
      });
      
      // adding newTodo succeeded 
      Swal.fire({
        position: "top-middle",
        icon: "success",
        title: `todo ${newTodo.id} added!`,
        showConfirmButton: false,
        timer: 1500
      }); 
  
      event.target.reset();
    } catch (error) {
      // adding newTodo failed 
      Swal.fire({
        icon: "error",
        title: `${error.message}`,
        text: `error adding todo ${newTodo.id}`,
      }); 
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