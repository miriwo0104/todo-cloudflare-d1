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
  const [taskCategoryMasterIds, setTaskCategoryMasterId] = useState<string[]>([]); // 初期値を空配列に設定
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(false);

  const handleSearchClick = async () => {
    const queryParams = new URLSearchParams();
    if (isDeleted) {
      queryParams.append("isDeleted", isDeleted.toString());
    }
    if (isComplete) {
      queryParams.append("isComplete", isComplete.toString());
    }
    if (taskCategoryMasterIds.length >= 1) { // 配列の要素が1つ以上あるかで配列の中身をチェック
      taskCategoryMasterIds.map((taskCategoryMasterId) => {
        queryParams.append("taskCategoryMasterId", taskCategoryMasterId.toString());
      });
    }
    setIsSearchButtonDisabled(true);
    await navigate(`/tasks?${queryParams.toString()}`); // クエリパラメーターを含めて遷移
    setIsSearchButtonDisabled(false);
  };

  interface TaskCategoryMaster {
    id: string;
    name: string;
  }

  const taskCategoryMasters = useLoaderData<TaskCategoryMaster[]>();

  const handleCheckboxChange = (id: string) => {
    setTaskCategoryMasterId((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

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
          <div>カテゴリ</div>
          {taskCategoryMasters.map((taskCategoryMaster: TaskCategoryMaster) => (
            <label key={taskCategoryMaster.id}>
              <input
                type="checkbox"
                value={taskCategoryMaster.id}
                checked={taskCategoryMasterIds.includes(taskCategoryMaster.id)}
                onChange={() => handleCheckboxChange(taskCategoryMaster.id)}
              />
              {taskCategoryMaster.name}
            </label>
          ))}
        </div>
        <button
          onClick={handleSearchClick}
          disabled={isSearchButtonDisabled}
        >検索する</button>
      </div>
    </div>
  );
}