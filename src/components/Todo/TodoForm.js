import { useState } from "react";

const TodoForm = ({addTodo}) => {
  const [newTodoText, setNewTodoText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = async () => {
    if (newTodoText.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await addTodo(newTodoText.trim());
        setNewTodoText("");
      } catch (error) {
        console.error('Failed to add todo:', error);
        // Keep the text if adding failed
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isSubmitting) {
      addItem();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input 
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100" 
          type="text" 
          placeholder="Add a new task..." 
          value={newTodoText} 
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isSubmitting}
          autoFocus
        />
        <button 
          type="button" 
          onClick={addItem} 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors font-medium flex items-center"
          disabled={!newTodoText.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : (
            'Add'
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
