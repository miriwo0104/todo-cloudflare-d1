import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const isComplete = searchParams.get("isComplete");
  const isTrue = 1; // フラグONの意味 マジックナンバー申し訳ない。。

  try {
    const tasks = await context.db.tasks.findMany({
      where: {
        deleted_at: null,
        ...(isComplete !== null && { is_complete: isTrue }),
      },
    });
    return tasks;
  } catch (error) {
    console.error("Failed to load tasks:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}