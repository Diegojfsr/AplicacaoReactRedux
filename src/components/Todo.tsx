import React from 'react';

interface TodoProps {
  onClick: () => void;
  completed: boolean;
  text: string;
}

const Todo: React.FC<TodoProps> = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

export default Todo;
