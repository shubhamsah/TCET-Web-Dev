class Todo {
    constructor() {
        this.todos = [];
    }

    // Method to add a new todo to the list
    add(todo) {
        this.todos.push(todo);
    }

    // Method to remove a todo by index
    remove(indexOfTodo) {
        if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
            this.todos.splice(indexOfTodo, 1);
        } else {
            console.error("Invalid index");
        }
    }

    // Method to update a todo at a given index
    update(index, updatedTodo) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index] = updatedTodo;
        } else {
            console.error("Invalid index");
        }
    }

    // Method to get all todos
    getAll() {
        return this.todos;
    }

    // Method to get a todo by index
    get(indexOfTodo) {
        if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
            return this.todos[indexOfTodo];
        } else {
            console.error("Invalid index");
            return null;
        }
    }

    // Method to clear all todos
    clear() {
        this.todos = [];
    }
}

// Example usage:
const todoList = new Todo();

todoList.add("Learn JavaScript");
todoList.add("Learn React");
todoList.add("Build a project");

console.log(todoList.getAll()); // Output: ["Learn JavaScript", "Learn React", "Build a project"]

todoList.remove(1);
console.log(todoList.getAll()); // Output: ["Learn JavaScript", "Build a project"]

todoList.update(0, "Master JavaScript");
console.log(todoList.get(0)); // Output: "Master JavaScript"

console.log(todoList.get(1)); // Output: "Build a project"

todoList.clear();
console.log(todoList.getAll()); // Output: []
