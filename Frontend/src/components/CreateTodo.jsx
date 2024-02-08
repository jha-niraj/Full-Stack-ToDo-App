import { useEffect, useState } from "react"; 

function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="input-container">
            <input 
                type="text"
                placeholder="Enter a ToDo title"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            /> <br />
            <input 
                type="text" 
                placeholder="Enter a ToDo description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            /> <br />
            <button onClick={() => {
                    fetch("http://localhost:5005/todo", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title: title,
                            description: description
                        })
                    })
                    .then(async (res) => {
                        const json = await res.json();
                        // alert("Todo Added");
                    })
            }}>Add a ToDo</button>
        </div>
    )
}

export default CreateTodo;