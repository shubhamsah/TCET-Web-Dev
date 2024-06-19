// Implement a class `Todo` having the below methods
//     - add(todo): adds todo to list of todos
//     - remove(indexOfTodo): remove todo from the list of todos
//     - update(index, updatedTodo): update todo at given index
//     - getAll: returns all todos
//     - get(indexOfTodo): returns todo at the given index
//     - clear: deletes all todos

class Todo {
    constructor() {
        this.todos = [];
    }
    add(todo) {
        this.todos.push(todo);
    }
    remove(indexOfTodo) {
        this.todos.splice(indexOfTodo, 1);
    }
    update(index, updatedTodo) {
        this.todos[index] = updatedTodo;
    }
    getAll() {
        return this.todos;
    }
    get(indexOfTodo) {
        return this.todos[indexOfTodo];
    }
    clear() {
        for (let i = 0; i < this.todos.length; i++) {
            this.todos.pop();
        }
    }
}

todo = new Todo()
todo.add("Buy milk")
todo.add("study")
console.log(todo.getAll())
console.log(todo.get(1))
todo.remove(0)
todo.update(0, "Buy bread")
todo.clear()
console.log(todo.getAll())