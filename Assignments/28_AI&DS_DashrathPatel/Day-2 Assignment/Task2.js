const express = require('express');
const app = express();
app.use(express.json());

let todos = []; // In-memory storage for todos
let idCounter = 1; // Simple counter for unique IDs

// Create a new todo
app.post('/api/todos', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }
    const newTodo = { id: idCounter++, title, description, createdAt: new Date(), updatedAt: new Date() };
    todos.push(newTodo);
    res.status(201).json({ success: true, data: newTodo, message: 'Todo created successfully' });
});

// Get all todos
app.get('/api/todos', (req, res) => {
    res.status(200).json({ success: true, data: todos });
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ success: false, message: 'Todo not found.' });
    }
    if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }
    todo.title = title;
    todo.description = description;
    todo.updatedAt = new Date();
    res.status(200).json({ success: true, data: todo, message: 'Todo updated successfully' });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Todo not found.' });
    }
    todos.splice(index, 1);
    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
