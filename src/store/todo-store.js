import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { peopleStore } from './people-store';

class TodoStore {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
    });
    autorun(() => {
      console.log(this.report);
    });
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get report() {
    if (this.todos.length === 0) return '<none>';
    const nextTodo = this.todos.find((todo) => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null,
    });
  }
}

export const createTodoStore = () => {
  const todoStore = new TodoStore();

  todoStore.addTodo('read MobX tutorial');
  todoStore.addTodo('try MobX');
  todoStore.todos[0].completed = true;
  todoStore.todos[1].task = 'try MobX in own project';
  todoStore.todos[0].task = 'grok MobX tutorial';

  todoStore.todos[0].assignee = peopleStore[0];
  todoStore.todos[1].assignee = peopleStore[1];
  peopleStore[0].name = 'Michel Weststrate';

  return todoStore;
};
