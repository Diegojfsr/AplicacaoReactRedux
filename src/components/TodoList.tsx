import React from 'react';
import Todo from './Todo';

interface TodoListProps {
  todos: { text: string; completed: boolean }[];
  toggleTodo: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => toggleTodo(index)} />
    ))}
  </ul>
);

export default TodoList;
