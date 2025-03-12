// src/Labs/Lab3/todos/TodoList.tsx
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { Todo } from "./types"; 

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <>
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos.map((todo: Todo) => ( // Type the todo parameter
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <hr />
    </>
  );
}