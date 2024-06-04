import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    if (!todo) return;

    setTodos((tds) => [
      ...tds,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  function toggleComplete(id) {
    setTodos((tds) =>
      tds.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((tds) => tds.filter((todo) => id !== todo.id));
  }

  function editTodo(id) {
    setTodos((tds) =>
      tds.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  function editTask(task, id) {
    setTodos((tds) =>
      tds.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  }

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, i) =>
        todo.isEditing ? (
          <EditTodoForm task={todo} editTodo={editTask} />
        ) : (
          <Todo
            task={todo}
            key={i}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
