function Todos({todos}) {
    function updateButton(index) {
        
    }
    return (
        <div>
            {
                todos.map((todo, index) => {
                    return (
                        <div className="todo-container" key={index}>
                            <h1>{todo.title}</h1>
                            <h3>{todo.description}</h3>
                            <button onClick={updateButton(index)}>{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Todos;