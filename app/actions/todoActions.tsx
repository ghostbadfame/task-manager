"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

export async function create(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDateStr = formData.get("dueDate") as string;

  if (!title?.trim()) {
    return;
  }

  const data: any = {
    title: title.trim(),
  };

  if (description) {
    data.description = description.trim();
  }

  if (dueDateStr) {
    // Convert the datetime-local string to a Date object
    const dueDate = new Date(dueDateStr);
    // Check if the date is valid
    if (!isNaN(dueDate.getTime())) {
      data.dueDate = dueDate;
    }
  }

  await prisma.todo.create({ data });

  revalidatePath("/");
}

export async function edit(formData: FormData) {
  const title = formData.get("newTitle") as string;
  const description = formData.get("newDescription") as string;
  const dueDateStr = formData.get("newDueDate") as string;
  const inputId = formData.get("inputId") as string;

  const data: any = {};

  if (title?.trim()) {
    data.title = title.trim();
  }

  if (description) {
    data.description = description.trim();
  }

  if (dueDateStr) {
    const dueDate = new Date(dueDateStr);
    if (!isNaN(dueDate.getTime())) {
      data.dueDate = dueDate;
    }
  }

  await prisma.todo.update({
    where: { id: inputId },
    data: data,
  });

  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await prisma.todo.delete({
    where: { id: inputId },
  });

  revalidatePath("/");
}

export async function todoStatus(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const todo = await prisma.todo.findUnique({
    where: { id: inputId },
  });

  if (!todo) {
    return;
  }

  const updatedStatus = !todo.isCompleted;

  await prisma.todo.update({
    where: { id: inputId },
    data: { isCompleted: updatedStatus },
  });

  revalidatePath("/");

  return updatedStatus;
}
