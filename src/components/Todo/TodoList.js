import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo, toggleComplete, editTodo, editingTodo, setEditingTodo }) => {

  const handleEdit = (id, newText) => {
    editTodo(id, newText);
    setEditingTodo(null);
  };

  return (
    <ul className="space-y-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={() => toggleComplete(todo.id)} onDelete={() => deleteTodo(todo.id)} onEdit={(newText) => handleEdit(todo.id, newText)} editingTodo={editingTodo} setEditingTodo={setEditingTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
