import type { MetaFunction } from "@remix-run/cloudflare";
import { useNavigate, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { loader } from "./task-category-masters-loader";
export { loader };

export const meta: MetaFunction = () => {
  return [
    { title: "Top" },
    {
      name: "description",
      content: "Top",
    },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [taskCategoryMasterId, setTaskCategoryMasterId] = useState(""); // 初期値を空文字列として定義

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams();
    if (isDeleted) {
      queryParams.append("isDeleted", isDeleted.toString());
    }
    if (isComplete) {
      queryParams.append("isComplete", isComplete.toString());
    }
    if (taskCategoryMasterId !== "") {
      queryParams.append("taskCategoryMasterId", taskCategoryMasterId.toString());
    }
    navigate(`/tasks?${queryParams.toString()}`); // クエリパラメーターを含めて遷移
  };

  interface TaskCategoryMaster {
  id: string;
  name: string;
}

  const taskCategoryMasters = useLoaderData<TaskCategoryMaster[]>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>
        <h2>タスク管理</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isDeleted}
              onChange={(e) => setIsDeleted(e.target.checked)}
            />
            削除済みを表示
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            完了済みを表示
          </label>
        </div>
        <div>
          <label>
            タスクカテゴリ:
            <select
              onChange={(e) => setTaskCategoryMasterId(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>選択してください</option>
              {taskCategoryMasters.map((taskCategoryMaster) => (
                <option key={taskCategoryMaster.id} value={taskCategoryMaster.id}>
                  {taskCategoryMaster.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button onClick={handleSearchClick}>検索する</button>
      </div>
    </div>
  );
}