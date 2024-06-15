#!/bin/bash

# SQLファイルのリスト
sql_files=(
    # NOTE: seedファイルを追加したらこちらにも追加
    "./seeds/task_category_masters_seed.sql"
    "./seeds/tasks_seed.sql"
)

# 各SQLファイルを実行
for file in "${sql_files[@]}"; do
    npx wrangler d1 execute todo-cloudflare-d1 --local --file "$file"
done