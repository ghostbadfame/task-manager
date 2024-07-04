import { PrismaClient } from "@prisma/client";

import AddTodo from "@/components/shared/AddTodo";

import Todo from "@/components/shared/Todo";

const prisma = new PrismaClient();
async function getData() {
  const data = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
const Home = async () => {
  const data = await getData();
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center overflow-hidden">
      <h1 className=" text-4xl font-extrabold uppercase mb-5">
        <span className=" text-cyan-700 ml-2">Task Manager</span>
      </h1>

      <div className="flex justify-center flex-col items-center md:w-[1000px] ">
        <AddTodo />
        <div className=" flex flex-col gap-5 items-center justify-center mt-10 w-full">
          {data.map((todo, id) => (
            <div className="w-full" key={id}>
              <Todo todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
