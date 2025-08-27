import { useState, useEffect } from 'react';
import { API } from '../services/todoAPI';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  // Load todos from API on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await API.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
      // Fallback to localStorage if API fails
      try {
        const savedTodos = localStorage.getItem('todoApp_todos');
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }
      } catch (localError) {
        console.error('Error loading from localStorage:', localError);
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoText) => {
    try {
      setOperationLoading(true);
      setError(null);

      const newTodo = {
        text: todoText,
        complete: false,
        createdAt: new Date().toISOString(),
        userId: 1
      };

      // Optimistic update
      const tempId = Date.now();
      const tempTodo = { ...newTodo, id: tempId };
      setTodos(prev => [...prev, tempTodo]);

      // API call
      const createdTodo = await API.createTodo(newTodo);
      
      // Replace temp todo with real todo
      setTodos(prev => prev.map(todo => 
        todo.id === tempId ? createdTodo : todo
      ));

      // Save to localStorage as backup
      const updatedTodos = todos.map(todo => 
        todo.id === tempId ? createdTodo : todo
      );
      localStorage.setItem('todoApp_todos', JSON.stringify([...updatedTodos, createdTodo]));

      return createdTodo;
    } catch (err) {
      // Revert optimistic update
      setTodos(prev => prev.filter(todo => todo.id !== Date.now()));
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      setOperationLoading(true);
      setError(null);

      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) throw new Error('Todo not found');

      const updatedTodo = { ...todoToUpdate, text: newText };

      // Optimistic update
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));

      // API call
      const apiUpdatedTodo = await API.updateTodo(id, updatedTodo);
      
      // Update with API response
      setTodos(prev => prev.map(todo => 
        todo.id === id ? apiUpdatedTodo : todo
      ));

      // Save to localStorage
      const updatedTodos = todos.map(todo => 
        todo.id === id ? apiUpdatedTodo : todo
      );
      localStorage.setItem('todoApp_todos', JSON.stringify(updatedTodos));

      return apiUpdatedTodo;
    } catch (err) {
      // Revert optimistic update
      const originalTodo = todos.find(todo => todo.id === id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? originalTodo : todo
      ));
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    const originalTodos = [...todos];
    try {
      setOperationLoading(true);
      setError(null);

      // Optimistic update
      setTodos(prev => prev.filter(todo => todo.id !== id));

      // API call
      await API.deleteTodo(id);

      // Save to localStorage
      const updatedTodos = originalTodos.filter(todo => todo.id !== id);
      localStorage.setItem('todoApp_todos', JSON.stringify(updatedTodos));

    } catch (err) {
      // Revert optimistic update
      setTodos(originalTodos);
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const toggleComplete = async (id) => {
    try {
      setOperationLoading(true);
      setError(null);

      const todoToToggle = todos.find(todo => todo.id === id);
      if (!todoToToggle) throw new Error('Todo not found');

      const updatedTodo = { ...todoToToggle, complete: !todoToToggle.complete };

      // Optimistic update
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));

      // API call
      const apiUpdatedTodo = await API.toggleTodo(id, todoToToggle);
      
      // Update with API response
      setTodos(prev => prev.map(todo => 
        todo.id === id ? apiUpdatedTodo : todo
      ));

      // Save to localStorage
      const updatedTodos = todos.map(todo => 
        todo.id === id ? apiUpdatedTodo : todo
      );
      localStorage.setItem('todoApp_todos', JSON.stringify(updatedTodos));

      return apiUpdatedTodo;
    } catch (err) {
      // Revert optimistic update
      const originalTodo = todos.find(todo => todo.id === id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? originalTodo : todo
      ));
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const clearCompleted = async () => {
    try {
      setOperationLoading(true);
      setError(null);

      const completedTodos = todos.filter(todo => todo.complete);
      const remainingTodos = todos.filter(todo => !todo.complete);

      // Optimistic update
      setTodos(remainingTodos);

      // Delete completed todos from API
      await Promise.all(
        completedTodos.map(todo => API.deleteTodo(todo.id))
      );

      // Save to localStorage
      localStorage.setItem('todoApp_todos', JSON.stringify(remainingTodos));

    } catch (err) {
      // Revert optimistic update
      setTodos(todos);
      setError('Failed to clear completed todos');
      console.error('Error clearing completed todos:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const clearAll = async () => {
    const allTodos = [...todos];
    try {
      setOperationLoading(true);
      setError(null);

      // Optimistic update
      setTodos([]);

      // Delete all todos from API
      await Promise.all(
        allTodos.map(todo => API.deleteTodo(todo.id))
      );

      // Clear localStorage
      localStorage.removeItem('todoApp_todos');

    } catch (err) {
      // Revert optimistic update
      setTodos(allTodos);
      setError('Failed to clear all todos');
      console.error('Error clearing all todos:', err);
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  const refreshTodos = () => {
    loadTodos();
  };

  // Statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.complete).length;
  const pendingTodos = totalTodos - completedTodos;

  return {
    todos,
    loading,
    error,
    operationLoading,
    totalTodos,
    completedTodos,
    pendingTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
    clearAll,
    refreshTodos,
    setError // Allow components to clear errors
  };
};
