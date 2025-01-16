import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo } from './actions';
import TodoList from './components/TodoList';

interface AppProps {
  todos: { text: string; completed: boolean }[];
  dispatch: any;
}

const App: React.FC<AppProps> = ({ todos, dispatch }) => {
  let input: HTMLInputElement | null = null;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input?.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
      <TodoList todos={todos} toggleTodo={index => dispatch(toggleTodo(index))} />
    </div>
  );
};

const mapStateToProps = (state: { todos: { text: string; completed: boolean }[] }) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
