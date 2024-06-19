import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const isCompleteParam: unknown = searchParams.get("isComplete");
  const isComplete: boolean = isCompleteParam === "true" ? true : false;

  const isDeletedParam: unknown = searchParams.get("isDeleted");
  const isDeleted: boolean = isDeletedParam === "true" ? true : false;

  const taskCategoryMasterIdParams: string[] = searchParams.getAll("taskCategoryMasterId");
  const taskCategoryMasterIds: number[] = taskCategoryMasterIdParams.map(id => Number(id));

  const isTrue = 1; // フラグONの意味 マジックナンバー申し訳ない。。

  try {
    const tasks = await context.db.tasks.findMany({
      where: {
        ...(isComplete && { is_complete: isTrue }),
        ...(isDeleted && { deleted_at: {not: null}}),
        ...(taskCategoryMasterIds.length > 0 && { task_category_master_id: { in: taskCategoryMasterIds } }),
      },
      include: {
        task_category_master: true, // schema.prismaで定義したリレーションを指定
      },
    });
    return tasks;
  } catch (error) {
    console.error("Failed to load tasks:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}