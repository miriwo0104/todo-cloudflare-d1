-- CreateTable
CREATE TABLE "tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "memo" TEXT,
    "is_complete" INTEGER NOT NULL,
    "task_category_master_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "tasks_task_category_master_id_fkey" FOREIGN KEY ("task_category_master_id") REFERENCES "task_category_masters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
