import React, { useState, useEffect } from "react";
import TodoForm from './TodoForm';
import TodoList from './TodoList';
// import { exportTodos, importTodos } from '../../utils/localStorage';

const STORAGE_KEY = 'todoApp_todos';

const TodoApp = () => {
  // Load todos from localStorage on component mount
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });
  
  const [editingTodo, setEditingTodo] = useState(null);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, complete: !todo.complete } : todo));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  // const clearAllTodos = () => {
  //   if (window.confirm('Are you sure you want to delete all todos?')) {
  //     setTodos([]);
  //   }
  // };

  // const clearCompletedTodos = () => {
  //   setTodos(todos.filter(todo => !todo.complete));
  // };

  // const handleExportTodos = () => {
  //   if (exportTodos(todos)) {
  //     alert('Todos exported successfully!');
  //   } else {
  //     alert('Error exporting todos');
  //   }
  // };

  // const handleImportTodos = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     importTodos(file)
  //       .then((importedTodos) => {
  //         if (window.confirm(`Import ${importedTodos.length} todos? This will replace your current todos.`)) {
  //           setTodos(importedTodos);
  //           alert('Todos imported successfully!');
  //         }
  //       })
  //       .catch((error) => {
  //         alert(`Error importing todos: ${error.message}`);
  //       })
  //       .finally(() => {
  //         // Reset file input
  //         event.target.value = '';
  //       });
  //   }
  // };

  // Statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.complete).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Todo App
      </h1>
      
      {/* Statistics */}
      {totalTodos > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-500">{totalTodos}</p>  
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-500">{completedTodos}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-500">{pendingTodos}</p>
            </div>
          </div>
        </div>
      )}

      <TodoForm addTodo={addTodo} />
      
      <TodoList 
        todos={todos} 
        deleteTodo={deleteTodo} 
        toggleComplete={toggleComplete} 
        editTodo={editTodo} 
        editingTodo={editingTodo} 
        setEditingTodo={setEditingTodo} 
      />

      {/* Action Buttons */}
      {/* {totalTodos > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 justify-center">
            {completedTodos > 0 && (
              <button
                onClick={clearCompletedTodos}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Clear Completed ({completedTodos})
              </button>
            )}
            <button
              onClick={clearAllTodos}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Clear All
            </button>
            <button
              onClick={handleExportTodos}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              Export Data
            </button>
            <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium cursor-pointer">
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleImportTodos}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )} */}

      {/* Import button for empty state */}
      {/* {totalTodos === 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-4">No todos yet. Add one above or import from a file!</p>
          <label className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer">
            Import Todos
            <input
              type="file"
              accept=".json"
              onChange={handleImportTodos}
              className="hidden"
            />
          </label>
        </div>
      )} */}
    </div>
  );
};

export default TodoApp;
