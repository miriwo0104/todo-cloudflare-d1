import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import constants from "~/config/constants";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const isCompleteParam: unknown = searchParams.get("isComplete");
  const isComplete: boolean = isCompleteParam === "true" ? true : false;

  const isDeletedParam: unknown = searchParams.get("isDeleted");
  const isDeleted: boolean = isDeletedParam === "true" ? true : false;

  const taskCategoryMasterIdParams: string[] = searchParams.getAll("taskCategoryMasterId");
  const taskCategoryMasterIds: number[] = taskCategoryMasterIdParams.map(id => Number(id));

  const nowPage: number = Number(searchParams.get("page")) || constants.DEFAULT_PAGE; // 設定されていなかったらデフォルト値の1を設定
  const pageSize: number = constants.DEFAULT_PAGE_SIZE; // 1ページあたりの表示数

  interface WhereCondition {
    is_complete?: number;
    deleted_at?: { not: null };
    task_category_master_id?: { in: number[] };
  }

  // whereの条件を定義
  const whereCondition = {
    ...(isComplete && { is_complete: constants.IS_TRUE }),
    ...(isDeleted && { deleted_at: { not: null } }),
    ...(taskCategoryMasterIds.length > 0 && { task_category_master_id: { in: taskCategoryMasterIds } }),
  };

  try {
    const tasks = await context.db.tasks.findMany({
      where: whereCondition as WhereCondition,
      include: {
        task_category_master: true, // schema.prismaで定義したリレーションを指定
      },
      skip: (nowPage - 1) * pageSize, // スキップするレコード数
      take: pageSize, // 取得するレコード数
    });
    const tasksCount = await context.db.tasks.count({
      where: whereCondition as WhereCondition,
    });
    return {
      tasks,
      tasksCount,
      pageSize,
      nowPage,
    };
  } catch (error) {
    console.error("Failed to load tasks:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}