export const addTodo = (text: string) => ({
    type: 'ADD_TODO',
    text
  });
  
  export const toggleTodo = (index: number) => ({
    type: 'TOGGLE_TODO',
    index
  });
  
  