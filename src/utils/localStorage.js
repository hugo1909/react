// localStorage utility functions for Todo App

export const STORAGE_KEY = 'todoApp_todos';

// Save todos to localStorage
export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
    return false;
  }
};

// Load todos from localStorage
export const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

// Clear all todos from localStorage
export const clearTodosStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
    return false;
  }
};

// Export todos as JSON file
export const exportTodos = (todos) => {
  try {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting todos:', error);
    return false;
  }
};

// Import todos from JSON file
export const importTodos = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const todos = JSON.parse(e.target.result);
          if (Array.isArray(todos)) {
            resolve(todos);
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(new Error('Error parsing JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
};

// Get storage usage info
export const getStorageInfo = () => {
  try {
    const todos = loadTodos();
    const dataSize = JSON.stringify(todos).length;
    return {
      count: todos.length,
      size: dataSize,
      sizeFormatted: formatBytes(dataSize)
    };
  } catch (error) {
    return { count: 0, size: 0, sizeFormatted: '0 B' };
  }
};

// Format bytes to human readable format
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
