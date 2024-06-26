# Welcome to Remix + Cloudflare!

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

## Clone後の処理

1. .envの用意

    ```sh
    cp .env.example .env
    ```

1. パッケージのインストール

    ```sh
    npm install
    ```

1. CloudFlareのCLI設定

    ```sh
    npx wrangler login
    ```

1. CloudFlareのD1（ローカル用）のマイグレーション

    ```sh
    npm run local-migrate
    ```

1. seedの実行

    ```sh
    npm run local-seed
    ```

## その他のコマンド

### ローカルサーバー起動

```sh
npm run dev
```

### デプロイ

```sh
npm run deploy
```

### ローカルDBのマイグレーションリセット

```sh
npm run local-migrate-reset
```

### ローカルDBのマイグレーションリセット + seed実行

```sh
npm run local-migrate-reset-and-seed
```