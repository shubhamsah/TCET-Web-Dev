const express = require("express");
const app = express();

const todos = [
    { id: 1, task: "Learn to HACK TCET Database", completed: false },
    { id: 2, task: "Hack TCET DataBase (Being a Permanent community member of TCET Opensource)", completed: true },
    { id: 3, task: "Make my attendance as 100%", completed: false }
];

app.use(express.json());

app.get("/todos", function(req, res) {
    res.json(todos);
});

app.post("/todos", function(req, res) {
    const { task, completed } = req.body;
    const newTodo = {
        id: todos.length + 1,
        task,
        completed: completed || false
    };
    todos.push(newTodo);
    res.json({ msg: "Todo added", todo: newTodo });
});

app.put("/todos/:id", function(req, res) {
    const { id } = req.params;
    const { task, completed } = req.body;

    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ msg: "Todo not found" });
    }

    if (task) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    res.json({ msg: "Todo updated", todo });
});

app.delete("/todos/:id", function(req, res) {
    const { id } = req.params;

    const todoIndex = todos.findIndex(t => t.id === parseInt(id));
    if (todoIndex === -1) {
        return res.status(404).json({ msg: "Todo not found" });
    }

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json({ msg: "Todo deleted", todo: deletedTodo[0] });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
