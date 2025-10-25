# Repository Guidelines

## プロジェクト構成とモジュール構造
Astro 5 と React で構築された静的サイトです。ルーティングは `src/pages`、共通レイアウトは `src/layouts`、UI コンポーネントは `src/components` に配置します。コピーや設定などのデータは `src/data` に TypeScript もしくは JSON で保存し、大きめの静的アセットは `public`、コンポーネントから参照する画像は `src/assets` を使用してください。スタイルは `src/styles` と `tailwind.config.mjs` で集中管理し、生成物は `dist/` に出力されます。環境変数は `.env` と `src/env.d.ts` で管理し、ビルド設定は `astro.config.mjs` を参照して変更範囲を把握します。

## ビルド・テスト・開発コマンド
開発時は `npm run dev` でローカルサーバー (http://localhost:4321) を起動し、必要に応じて `npm run dev -- --host` で外部端末から確認します。型検証と構成チェックは `npm run astro -- check`、ビルド検証は `npm run build` を利用します。デプロイ前の確認として `npm run preview` を実行し、生成された `dist/` をブラウザで確認してください。依存追加時は `npm install <package>@<version>` を実行し、変更された `package-lock.json` を必ずコミットに含めます。

## コーディングスタイルと命名規則
TypeScript・TSX・Astro すべて 2 スペースインデントが既定です。コンポーネントは PascalCase、ユーティリティやフックは camelCase、データや設定ファイルはケバブケース (例: `tour-dates.ts`) を使用します。Tailwind クラスはレイアウト → サイズ → 色の順にまとめ、フォーマットはエディタの Prettier もしくは Astro 公式拡張で整えます。React コンポーネントの props は `type Props = { ... }` で宣言し、`src/data` のエクスポートは named export に統一します。不要な `console.log` はコミット前に削除し、アクセシビリティ属性の指定を忘れないでください。

## テストガイドライン
自動テスト基盤は未整備のため、少なくとも `npm run astro -- check` と `npm run build` を実行して型・ビルドエラーを除去します。UI 変更時は `npm run preview` でトップページや主要フローを手動確認し、確認結果をメモとして残してください。主要な分岐 (フォーム送信、ライブ情報表示など) はスクリーンキャストやチェックリストで共有するとレビューが楽になります。将来的にシナリオテストを追加する場合は Playwright を想定し、`tests/` 配下に `page-name.spec.ts` 形式で配置します。

## コミット・プルリクエストガイドライン
コミットは Conventional Commits (`feat: ...`, `fix: ...` など) を採用し、50 文字以内で要約します。PR では変更概要・理由・確認手順を箇条書きし、関連 issue や `作成仕様書.md` の該当セクションがあればリンクしてください。UI 変更はスクリーンショットを添付し、`npm run build` 実行結果も共有します。レビュアーの時間を節約するため、セルフレビューと TODO の消化状況を PR コメントに追記し、レビュー指摘は追加コミットで対応します。マージ前に再度ビルドを通すことを推奨します。

## 画像最適化
プロジェクト内の画像は、パフォーマンス向上のためにWebP形式に変換されています。新しい画像を追加する際は、以下の手順でWebPに変換し、元の画像を削除してください。

1.  **画像変換スクリプトの実行:**
    プロジェクトルートに `convert-images.mjs` というスクリプトがあります。このスクリプトは `public` ディレクトリ内のすべての `.jpg`, `.jpeg`, `.png` 画像を検索し、WebP形式に変換します。
    ```bash
    node convert-images.mjs
    ```

2.  **コード内の参照を更新:**
    スクリプトは画像を変換するだけで、コード内の画像パスは自動で更新しません。手動で `.jpg` や `.png` から `.webp` に変更する必要があります。

3.  **不要になった元の画像を削除:**
    WebPへの変換とコードの更新が完了したら、元の画像ファイル（`.jpg`, `.jpeg`, `.png`）は手動で削除してください。

4.  **変換スクリプトの依存関係:**
    変換スクリプトは `sharp` と `glob` パッケージに依存しています。これらは開発用依存関係 (`devDependencies`) として `package.json` に記載されています。
    ```json
    "devDependencies": {
      "sharp": "^0.33.0",
      "glob": "^10.0.0"
      ...
    }
    ```

## セキュリティと設定のヒント
.env に機密情報を保存し、`astro.config.mjs` と `src/env.d.ts` で型定義を整えた上で参照します。CI を導入する場合は Node.js 18 以上で `npm ci` → `npm run build` → `npm run astro -- check` の順に実行してローカルとの整合を保ってください。デプロイ後に問題があれば `dist/` と `public/` の差分を確認し、必要に応じて `git tag release-YYYYMMDD` 形式でロールバック用タグを作成します。
