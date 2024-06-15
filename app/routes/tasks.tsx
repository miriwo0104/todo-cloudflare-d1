import type { MetaFunction } from "@remix-run/cloudflare";

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
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>tasks</h1>
      <ul>
        <li>
            タスク1
        </li>
        <li>
            タスク2
        </li>
      </ul>
    </div>
  );
}
