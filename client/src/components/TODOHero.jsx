function TODOHero({ todos_completed, total_todos }) {
  return (
    <section className="todohero_section">
      <div>
        <p className="text_large">
          {todos_completed === total_todos ? "Task Done" : "Complete Your Tasks!"}
        </p>
        <p className="text_small">
          {todos_completed === total_todos ? "Keep it up" : ""}
        </p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
}

export default TODOHero;