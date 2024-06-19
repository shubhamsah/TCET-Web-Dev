// Todo Implement using Class:

/*
Implement a class `Todo` having the below methods
- add(todo): adds todo to list of todos
- remove(indexOfTodo): remove todo from the list of todos
- update(index, updatedTodo): update todo at given index
- getAll: returns all todos
- get(indexOfTodo): returns todo at the given index
- clear: deletes all todos
*/

class Todo {
    constructor() {
        this.todos = [];
    }

    // Add a new todo
    add(todo) {
        this.todos.push(todo);
    }

    // Remove a todo at a specific index
    remove(indexOfTodo) {
        if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
            this.todos.splice(indexOfTodo, 1);
        } else {
            console.log("Invalid index");
        }
    }

    // Update a todo at a specific index
    update(index, updatedTodo) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index] = updatedTodo;
        } else {
            console.log("Invalid index");
        }
    }

    // Get all todos
    getAll() {
        return this.todos;
    }

    // Get a todo at a specific index
    get(indexOfTodo) {
        if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
            return this.todos[indexOfTodo];
        } else {
            console.log("Invalid index");
            return null;
        }
    }

    // Clear all todos
    clear() {
        this.todos = [];
    }
}


const myTodos = new Todo();

// Add todos
myTodos.add("Go to class");
myTodos.add("Try not to die");
myTodos.add("Return home");

// Get all 
console.log("All todos:", myTodos.getAll());

// Update 
myTodos.update(1, "Build a complex project");
console.log("Updated todos:", myTodos.getAll());

// Get a specific todo
console.log("Todo at index 1:", myTodos.get(1));

// Remove 
myTodos.remove(0);
console.log("Todos after removal:", myTodos.getAll());

// Clear all
myTodos.clear();
console.log("Todos after clearing:", myTodos.getAll());
