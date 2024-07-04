import { create } from "@/app/actions/todoActions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";

const AddTodo = () => {
  return (
    <Form action={create} className="w-1/2 m-auto">
      <div className="flex flex-col gap-4">
        <Input name="title" type="text" placeholder="Title" />
        <textarea
          name="description"
          placeholder="Description"
          className="p-2 border rounded"
        />
        <Input name="dueDate" type="datetime-local" />
        <Button type="submit" text="Add Todo" />
      </div>
    </Form>
  );
};

export default AddTodo;
