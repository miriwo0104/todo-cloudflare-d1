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
  const taskListInfos = useLoaderData<TaskListInfos>();
  const tasks = taskListInfos.tasks;
  const tasksCount = taskListInfos.tasksCount;
  const pageSize = taskListInfos.pageSize;
  const nowPage = taskListInfos.nowPage;
  const totalPage = Math.ceil(tasksCount / pageSize); // 切り上げで整数を返す
  const existsBeforePage = nowPage !== 1; // 現在のページが1ページ目ではない場合前ページが有る
  const beforePage = nowPage - 1; // 前ページのページ番号
  const existsAfterPage = nowPage !== totalPage; // 現在のページが最終ページではない場合次ページが有る
  const afterPage = nowPage + 1; // 次ページのページ番号

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
        <div>
          { existsBeforePage
            ? <a href={`?page=${beforePage}`}>
                前ページへ
              </a>
            : null
          }
        </div>
        <div>{nowPage} / {totalPage}</div>
        <div>
          { existsAfterPage
            ? <a href={`?page=${afterPage}`}>
                次ページへ
              </a>
            : null
          }
        </div>
      </div>
    </div>
  );
}
