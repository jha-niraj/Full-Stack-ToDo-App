const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { createTodo, updateTodo } = require("./type");
const { todo } = require("./database");

const port = 5005;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Route to add the todo:
app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    
    try {
        const parsedPayload = createTodo.safeParse(createPayload);
        if(parsedPayload.success) {
            // If the above condition pass, then go ahead with the forward logic:
            await todo.create({
                title: createPayload.title,
                description: createPayload.description,
                completed: false
            })
            res.status(200).json({
                msg: "Todo Posted on the server."
            })
        }
    } catch(error) {
        res.json({
            msg: "Something is wrong with the inputs!!!"
        })
    }
})

app.get('/todos', async (req, res) => {
    const todos = await todo.find();

    res.json({
        todos
    })
})

app.put('/completed', async (req, res) => {
    const { id } = req.body;

    try {
        const parsedPayload = updateTodo.safeParse({id});
        console.log(parsedPayload);
        if(parsedPayload.success) {
            const updatedTodo = await todo.updateOne({
                _id: id
            }, {
                $set: {
                    completed: true
                }
            })
            if (updatedTodo) {
                res.status(200).json({
                    msg: "Todo marked as completed.",
                    updatedTodo
                });
            } else {
                res.status(404).json({
                    msg: "Todo not found."
                });
            }
        } else {
            res.json({
                msg: "Something wrong with your input!!!"
            })
        }
    } catch(error) {
        res.json({
            msg: "Error Occured!!!"
        })
    }
})

app.use((err, req, res, next) => {
    res.status(500).send("Something is up with the server!!!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}---`);
})