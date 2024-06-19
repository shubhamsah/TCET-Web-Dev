// Express JS for get, post, put and delete for Todo list (like we did for kidneys in hospital.js)


const express = require("express");
const app = express();

app.use(express.json());

// In-memory object
let user = {
    name: "Huzaifa",
    todoList: []
};


// Get all tasks
app.get('/', (req, res) => {
    const numTasks = user.todoList.length;
    let completedTasks = 0;
    for (let i = 0; i < numTasks; i++) {
        if (user.todoList[i].completed) {
            completedTasks += 1;
        }
    }
    let incompleteTasks = numTasks - completedTasks;
    res.send({
        "Total Tasks": numTasks, 
        "Completed Tasks": completedTasks, 
        "Incomplete Tasks": incompleteTasks
    });
});


// Add task
app.post("/", (req, res) => {
    const task = {
        taskName: req.body.taskName,
        completed: false
    };
    user.todoList.push(task);
    res.json({
        "msg": "Task added successfully"
    });
});


// Mark all tasks as completed
app.put('/', (req, res) => {
    for (let i = 0; i < user.todoList.length; i++) {
        user.todoList[i].completed = true;
    }
    res.json({
        "message": "All tasks marked as completed"
    });
});


// Delete all completed tasks
app.delete('/', (req, res) => {
    const newTodoList = user.todoList.filter(task => !task.completed);
    user.todoList = newTodoList;
    res.json({
        "msg": "Completed tasks deleted from the todo list"
    });
});


app.listen(8000);