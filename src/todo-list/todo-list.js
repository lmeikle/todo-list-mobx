import { observer } from 'mobx-react-lite';
import TodoView from './todo-view';

const TodoList = observer(({ store, peopleStore }) => {
  const onNewTodo = () => {
    store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  };

  const updateMyName = (event) => {
    peopleStore[1].name = event.target.value;
  };

  return (
    <div>
      {store.report}
      <ul>
        {store.todos.map((todo, idx) => (
          <TodoView todo={todo} key={idx} />
        ))}
      </ul>
      {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
      <button onClick={onNewTodo}>New Todo</button>
      <small> (double-click a todo to edit)</small>

      <div>
        Change my Name
        <input onKeyUp={updateMyName} />
      </div>
    </div>
  );
});

export default TodoList;
