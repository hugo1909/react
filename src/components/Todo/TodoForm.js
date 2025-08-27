import { useState } from "react";

const TodoForm = ({addTodo}) => {
  const [newTodoText, setNewTodoText] = useState("");

  const addItem = () => {
    if (newTodoText.trim()) {
      const newTodo = { 
        id: Date.now(), 
        text: newTodoText.trim(), 
        complete: false, 
        createdAt: new Date().toISOString() 
      };
      addTodo(newTodo);
      setNewTodoText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input 
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
          type="text" 
          placeholder="Add a new task..." 
          value={newTodoText} 
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button 
          type="button" 
          onClick={addItem} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-500 transition-colors font-medium"
          disabled={!newTodoText.trim()}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
