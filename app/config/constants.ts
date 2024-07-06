import dotenv from "dotenv";
dotenv.config();

const constants = {
  // COMMON
  IS_TRUE: true,

  // タスク系
  DEFAULT_PAGE: 1, // ページネーションのデフォルトページ
  DEFAULT_PAGE_SIZE: 5, // ページネーション1ページあたりの表示数
  FIRST_PAGE: 1, // ページネーションの最初のページ
};

export default constants;