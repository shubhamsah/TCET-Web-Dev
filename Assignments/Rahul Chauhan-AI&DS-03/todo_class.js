class TaskManager {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    removeTask(taskIndex) {
      if (taskIndex < 0 || taskIndex >= this.tasks.length) {
        return;
      }
      this.tasks.splice(taskIndex, 1);
    }
  
    updateTask(index, updatedTask) {
      if (index < 0 || index >= this.tasks.length) return;
      this.tasks[index] = updatedTask;
    }
  
    getAllTasks() {
      return this.tasks;
    }
  
    getTask(taskIndex) {
      if (taskIndex < 0 || taskIndex >= this.tasks.length) return null;
      return this.tasks[taskIndex];
    }
  
    clearTasks() {
      this.tasks = [];
    }
  }

  const taskManager = new TaskManager();
  taskManager.addTask('Complete project report');
  taskManager.addTask('Schedule meeting with team');
  taskManager.addTask('Plan team outing');
  
  console.log(taskManager.getAllTasks()); 
  taskManager.removeTask(1);
  console.log(taskManager.getAllTasks()); 
  taskManager.updateTask(1, 'Plan virtual team outing');
  console.log(taskManager.getAllTasks()); 
  console.log(taskManager.getTask(0)); 
  console.log(taskManager.getTask(1)); 
  
  taskManager.clearTasks();
  console.log(taskManager.getAllTasks());
  
  