#!/bin/bash

# SQLファイルのリスト
sql_files=(
    # NOTE: seedファイルを追加したらこちらにも追加
    "./seeds/task_category_masters_seed.sql"
    "./seeds/tasks_seed.sql"
)

# 各SQLファイルを実行
for file in "${sql_files[@]}"; do
    if [ "$1" == "--preview" ]; then
        npx wrangler d1 execute todo-cloudflare-d1 --preview --remote --file "$file"
    else
        npx wrangler d1 execute todo-cloudflare-d1 $1 --file "$file"
    fi
done