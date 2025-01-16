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
  