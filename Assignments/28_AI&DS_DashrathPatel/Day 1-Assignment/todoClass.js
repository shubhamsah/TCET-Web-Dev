class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(indexOfTodo) {
    if (indexOfTodo < 0 || indexOfTodo > this.todos.length - 1) {
      return;
    }
    this.todos.splice(indexOfTodo, 1);
  }

  update(index, updatedTodo) {
    if (index < 0 || index > this.todos.length - 1) return;
    this.todos[index] = updatedTodo;
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    if (indexOfTodo < 0 || indexOfTodo > this.todos.length - 1) return null;
    return this.todos[indexOfTodo];
  }

  clear() {
    this.todos = [];
  }
}
