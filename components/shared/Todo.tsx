"use client";

import React, { useState } from "react";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";
import ChangeTodo from "./ChangeTodo";
import { todoType } from "@/types/todoTypes";

const Todo = ({ todo }: { todo: todoType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const todoStyle = {
    textDecoration: todo.isCompleted ? "line-through" : "none",
    opacity: todo.isCompleted ? 0.5 : 1,
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleString(); // Formats date and time
  };

  return (
    <div className="w-full bg-white py-3 px-20 rounded-2xl mb-4">
      <div className="flex items-center justify-between" style={todoStyle}>
        <ChangeTodo todo={todo} />
        <div className="flex-grow mx-4">
          <div
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-bold uppercase">{todo.title}</span>
            <span className="text-sm text-gray-500 ml-2">
              {formatDate(todo.dueDate)}
            </span>
          </div>
          {isExpanded && todo.description && (
            <p className="text-sm mt-2">{todo.description}</p>
          )}
        </div>
        <div className="flex items-center gap-5">
          <EditTodo todo={todo} />
          <DeleteTodo todo={todo} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
