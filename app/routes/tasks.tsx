import type { MetaFunction } from "@remix-run/cloudflare";
import { loader } from "./tasks-loader";
export { loader };
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "tasks" },
    {
      name: "description",
      content: "tasks",
    },
  ];
};

interface Task {
  id: string;
  name: string;
  memo: string;
  is_complete: boolean;
  task_category_master_id: string;
  created_at: string;
  updated_at: string;
  task_category_master: {
    id: string;
    name: string;
  };
}

export default function Index() {
  const tasks = useLoaderData<Task[]>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>tasks</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <div>id: {task.id}</div>
            <div>name: {task.name}</div>
            <div>memo: {task.memo}</div>
            <div>is complete: {task.is_complete}</div>
            <div>task category: {task.task_category_master.name}</div>
            <div>created at: {task.created_at}</div>
            <div>updated at: {task.updated_at}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
