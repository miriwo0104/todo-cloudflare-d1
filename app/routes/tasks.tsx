import type { MetaFunction } from "@remix-run/cloudflare";
import type { TaskListInfos, Task } from "~/types";
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

export default function Index() {
  const taskListInfos = useLoaderData<TaskListInfos[]>();
  const tasks = taskListInfos.tasks;
  const tasksCount = taskListInfos.tasksCount;
  const pageSize = taskListInfos.pageSize;
  const nowPage = taskListInfos.nowPage;
  const totalPage = Math.ceil(tasksCount / pageSize); // 切り上げで整数を返す
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
      <div>
        <p>{nowPage} / {totalPage}</p>
      </div>
    </div>
  );
}
