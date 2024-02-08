/*
    Simple way to create a schema in Mongo Db:
    const todos = mongo.Schema({
        Anything
    })
*/
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jhaniraj45:nirajjha%403110@todo-app.y7z3ary.mongodb.net/?retryWrites=true&w=majority");

const todoschema = mongoose.Schema({
    title: String,
    description: String, 
    completed: Boolean
})

const todo = mongoose.model('todos', todoschema);

module.exports = {
    todo
}