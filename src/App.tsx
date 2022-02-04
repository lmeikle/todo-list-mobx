import { action } from 'mobx';
import React from 'react';
import './App.css';
import { peopleStore } from './store/people-store';
import TodoList from './todo-list/todo-list';

import { createTodoStore } from './store/todo-store';
const todoStore = createTodoStore();

todoStore.pendingRequests++;
setTimeout(
  action(() => {
    todoStore.addTodo('Random Todo ' + Math.random());
    todoStore.pendingRequests--;
  }),
  5000,
);

function App() {
  return (
    <div className="App">
      {/* @ts-ignore */}
      <TodoList store={todoStore} peopleStore={peopleStore} />
    </div>
  );
}

export default App;
