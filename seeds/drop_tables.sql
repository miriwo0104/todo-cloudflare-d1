-- DropTable
-- マイグレーション管理テーブルリセット
DELETE FROM d1_migrations;
-- NOTE: テーブルを追加したらこちらにも忘れず追記
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS task_category_masters;
DROP TABLE IF EXISTS users;