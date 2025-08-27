// API service for Todo operations
// This can be configured to work with different backends

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com';

// API endpoints
const ENDPOINTS = {
  TODOS: '/todos'
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  return response.json();
};

// Helper function to transform JSONPlaceholder format to our format
const transformTodoFromAPI = (apiTodo) => ({
  id: apiTodo.id,
  text: apiTodo.title,
  complete: apiTodo.completed,
  createdAt: apiTodo.createdAt || new Date().toISOString(),
  userId: apiTodo.userId || 1
});

// Helper function to transform our format to API format
const transformTodoToAPI = (todo) => ({
  id: todo.id,
  title: todo.text,
  completed: todo.complete,
  userId: todo.userId || 1,
  createdAt: todo.createdAt
});

// API Functions
export const todoAPI = {
  // Get all todos
  async getTodos() {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TODOS}?_limit=10`); // Limit to 10 for demo
      const todos = await handleResponse(response);
      
      // Transform API response to our format
      return todos.map(transformTodoFromAPI);
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Create a new todo
  async createTodo(todo) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TODOS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformTodoToAPI(todo)),
      });
      
      const createdTodo = await handleResponse(response);
      return transformTodoFromAPI({
        ...createdTodo,
        // For JSONPlaceholder, we need to preserve our local data
        title: todo.text,
        completed: todo.complete,
        createdAt: todo.createdAt
      });
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update a todo
  async updateTodo(id, updatedTodo) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TODO(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformTodoToAPI(updatedTodo)),
      });
      
      const todo = await handleResponse(response);
      return transformTodoFromAPI({
        ...todo,
        // Preserve our local data for JSONPlaceholder
        title: updatedTodo.text,
        completed: updatedTodo.complete,
        createdAt: updatedTodo.createdAt
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Delete a todo
  async deleteTodo(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TODO(id)}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        return { success: true, id };
      }
      throw new Error('Failed to delete todo');
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  // Toggle todo completion status
  async toggleTodo(id, todo) {
    const updatedTodo = { ...todo, complete: !todo.complete };
    return this.updateTodo(id, updatedTodo);
  }
};

// Mock API for development (if you want to use local mock data)
export const mockTodoAPI = {
  todos: [
    {
      id: 1,
      text: "Learn React",
      complete: false,
      createdAt: new Date().toISOString(),
      userId: 1
    },
    {
      id: 2,
      text: "Build Todo App",
      complete: true,
      createdAt: new Date().toISOString(),
      userId: 1
    }
  ],

  async getTodos() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.todos];
  },

  async createTodo(todo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newTodo = { ...todo, id: Date.now() };
    this.todos.push(newTodo);
    return newTodo;
  },

  async updateTodo(id, updatedTodo) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...updatedTodo, id };
      return this.todos[index];
    }
    throw new Error('Todo not found');
  },

  async deleteTodo(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.todos = this.todos.filter(todo => todo.id !== id);
    return { success: true, id };
  },

  async toggleTodo(id, todo) {
    const updatedTodo = { ...todo, complete: !todo.complete };
    return this.updateTodo(id, updatedTodo);
  }
};

// Export the API to use (switch between real API and mock)
export const API = process.env.REACT_APP_USE_MOCK_API === 'true' ? mockTodoAPI : todoAPI;
