# AplicacaoReactRedux
Projeto de lista de tarefas (To-Do List) utilizando React, TypeScript e Vite.

### Passo 1: Configuração do Projeto
Primeiro, crie um novo projeto com Vite:
```
npm create vite@latest todo-app --template react-ts
cd todo-app
npm install
```

### Passo 2: Instalação do Redux e React-Redux
Instale as dependências necessárias:
```
npm install redux react-redux @types/react-redux
```
Passo 3: Estrutura do Projeto
Organize seu projeto da seguinte maneira:
```
src/
|-- actions/
|   |-- index.ts
|-- components/
|   |-- Todo.tsx
|   |-- TodoList.tsx
|-- reducers/
|   |-- index.ts
|   |-- todos.ts
|-- App.tsx
|-- main.tsx
```

### Passo 4: Criando Ações
No arquivo src/actions/index.ts, defina as ações:
```
export const addTodo = (text: string) => ({
  type: 'ADD_TODO',
  text
});
export const toggleTodo = (index: number) => ({
  type: 'TOGGLE_TODO',
  index
});
```

### Passo 5: Criando Redutores
No arquivo src/reducers/todos.ts, defina o redutor:
```
interface Todo {
  text: string;
  completed: boolean;
}
type Action = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; index: number };

const todos = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};
export default todos;
```
No arquivo src/reducers/index.ts, combine os redutores:
```
import { combineReducers } from 'redux';
import todos from './todos';

export default combineReducers({
  todos
});
```
### Passo 6: Configurando a Store
No arquivo src/main.tsx, configure a store:
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
### Passo 7: Criando Componentes
No arquivo src/components/Todo.tsx, crie o componente Todo:
```
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
```
No arquivo src/components/TodoList.tsx, crie o componente TodoList:
```
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
```
### Passo 8: Conectando Componentes ao Redux
No arquivo src/App.tsx, conecte os componentes ao Redux:
```
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
```

Agora você tem uma aplicação de lista de tarefas utilizando React, TypeScript e Vite.

