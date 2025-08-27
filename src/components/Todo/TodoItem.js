import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit, editingTodo, setEditingTodo }) => {
  const [editText, setEditText] = useState(todo.text);

  const saveEdit = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
    }
    setEditingTodo(null);
  };

  const cancelEdit = () => {
    setEditText(todo.text); // Reset to original text
    setEditingTodo(null);
  };

  const startEdit = () => {
    setEditText(todo.text);
    setEditingTodo(todo.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <li className={`flex items-center justify-between p-4 rounded shadow ${todo.complete ? "bg-green-200" : "bg-white"}`}>
      <div className="flex items-center flex-1 cursor-pointer">
        <input 
          type="checkbox" 
          checked={todo.complete} 
          onChange={onToggle} 
          className="mr-3" 
        />
        {editingTodo === todo.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="border border-gray-300 p-2 rounded flex-1 mr-2 focus:outline-none focus:border-blue-500"
            autoFocus
          />
        ) : (
          <span className={`flex-1 ${todo.complete ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="actions flex gap-2 ml-2">
        {editingTodo === todo.id ? (
          <>
            <button 
              onClick={saveEdit} 
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button 
              onClick={cancelEdit} 
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={startEdit} 
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
              disabled={todo.complete}
            >
              Edit
            </button>
            <button 
              onClick={onDelete} 
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
