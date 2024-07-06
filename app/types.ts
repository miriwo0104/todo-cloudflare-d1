export interface TaskListInfos {
  tasks: Task[];
  tasksCount: number;
  pageSize: number;
  nowPage: number;
}

export interface Task {
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