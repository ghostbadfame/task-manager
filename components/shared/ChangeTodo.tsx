"use client";

import React, { useState } from "react";
import { edit, todoStatus } from "@/app/actions/todoActions";
import Form from "../ui/Form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { todoType } from "@/types/todoTypes";

const ChangeTodo = ({ todo }: { todo: todoType }) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16); // format for datetime-local input
  };

  if (isEditing) {
    return (
      <Form action={edit} onSubmit={() => setIsEditing(false)}>
        <input name="inputId" value={todo.id} type="hidden" />
        <div className="flex flex-col gap-2">
          <Input name="newTitle" type="text" placeholder="Title" />
          <textarea
            name="newDescription"
            placeholder="Description"
            className="p-2 border rounded"
          />
          <Input name="newDueDate" type="datetime-local" />
          <Button type="submit" text="Save" />
        </div>
      </Form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Form action={todoStatus}>
        <input name="inputId" value={todo.id} type="hidden" />
        <Button actionButton type="submit" text={<AiOutlineCheckCircle />} />
      </Form>
      <Button
        actionButton
        onClick={() => setIsEditing(true)}
        text={<AiOutlineEdit />}
      />
    </div>
  );
};

export default ChangeTodo;
