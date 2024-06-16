import type { MetaFunction } from "@remix-run/cloudflare";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";

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

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams();
    if (isDeleted) {
      queryParams.append("isDeleted", isDeleted.toString());
    }
    if (isComplete) {
      queryParams.append("isComplete", isComplete.toString());
    }
    navigate(`/tasks?${queryParams.toString()}`); // クエリパラメーターを含めて遷移
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
        <button onClick={handleSearchClick}>検索する</button>
      </div>
    </div>
  );
}