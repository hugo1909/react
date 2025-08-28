import React, { useState } from "react";
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodos } from '../../hooks/useTodos';

const TodoApp = () => {
  const {
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
    setError
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = async (todoText) => {
    try {
      await addTodo(todoText);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleEditTodo = async (id, newText) => {
    try {
      await updateTodo(id, newText);
    } catch (error) {
      console.error('Failed to edit todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await toggleComplete(id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleClearCompleted = async () => {
    if (window.confirm(`Delete ${completedTodos} completed todos?`)) {
      try {
        await clearCompleted();
      } catch (error) {
        console.error('Failed to clear completed todos:', error);
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete all todos?')) {
      try {
        await clearAll();
      } catch (error) {
        console.error('Failed to clear all todos:', error);
      }
    }
  };

  const dismissError = () => {
    setError(null);
  };

  if (loading) {
    return (
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Todo App
        {operationLoading && (
          <span className="inline-block w-4 h-4 ml-2 border-b-2 border-blue-500 rounded-full animate-spin"></span>
        )}
      </h1>

      {/* Error Display */}
      {error && (
        <div className="flex items-center justify-between px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
          <span>{error}</span>
          <button onClick={dismissError} className="text-red-700 hover:text-red-900">
            ✕
          </button>
        </div>
      )}

      {/* Statistics */}
      {totalTodos > 0 && (
        <div className="p-4 mb-6 rounded-lg bg-gray-50">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-500">{totalTodos}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{completedTodos}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">{pendingTodos}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
      )}

      <TodoForm addTodo={handleAddTodo} />
      
      <TodoList 
        todos={todos} 
        deleteTodo={handleDeleteTodo} 
        toggleComplete={handleToggleComplete} 
        editTodo={handleEditTodo} 
        editingTodo={editingTodo} 
        setEditingTodo={setEditingTodo} 
      />

      {/* Action Buttons */}
      {totalTodos > 0 && (
        <div className="pt-4 mt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={refreshTodos}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              🔄 Refresh
            </button>
            {completedTodos > 0 && (
              <button
                onClick={handleClearCompleted}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                Clear Completed ({completedTodos})
              </button>
            )}
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {totalTodos === 0 && !loading && (
        <div className="mt-6 text-center">
          <p className="mb-4 text-gray-500">No todos yet. Add one above!</p>
        </div>
      )}

      {/* API Status */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🌐 Connected to API • 💾 Local backup enabled
        </p>
      </div>
    </div>
  );
};

export default TodoApp;
