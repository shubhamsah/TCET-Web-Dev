class Todo {
    constructor() {
        this.todos = [];
    }

    add(todo) {
        this.todos.push(todo);
    }

    remove(indexOfTodo) {
        if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
            this.todos.splice(indexOfTodo, 1);
        }
    }

    update(index, updatedTodo) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index] = updatedTodo;
        }
    }

    getAll() {
        return this.todos;
    }

    get(indexOfTodo) {
        if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
            return this.todos[indexOfTodo];
        }
        return null;
    }

    clear() {
        this.todos = [];
    }
}

const todoList = new Todo();
todoList.add("Buy dell alienware");
todoList.add("Buy macbook pro");
console.log(todoList.getAll()); 

todoList.update(1, "Buy macbook pro max");
console.log(todoList.get(1)); 

todoList.remove(0);
console.log(todoList.getAll()); 

todoList.clear();
console.log(todoList.getAll()); 
