# Repository Guidelines

## プロジェクト構成とモジュール構造
このリポジトリは Astro 5 と React コンポーネントで構成される静的サイトです。`src/pages` はルーティングを担当し、`src/layouts` が共通レイアウト、`src/components` が再利用可能な UI を保持します。コンテンツ指向のデータは `src/data` に JSON もしくは TypeScript モジュールとして配置し、`src/styles` でグローバルスタイルや Tailwind 拡張を管理します。ビルド済みアセットは `dist`（自動生成）に出力され、`public` 配下のファイルはパスそのままで配信されます。画像やフォントなど大きな静的ファイルは原則 `public` へ置き、コンポーネントでインポートしたいものは `src/assets` に保存してください。`astro.config.mjs` ではビルド出力や統合プラグインを制御するため、設定変更時は影響範囲を `作成仕様書.md` と照合してください。Tailwind のテーマ設定は `tailwind.config.mjs` に集約されており、色やフォントを更新する際はデザイン側の決定事項と一緒に Pull Request で共有することを推奨します。

## ビルド・テスト・開発コマンド
- `npm install`：依存関係をインストールします（初回および追加パッケージ導入時に実行）。Lock file は `package-lock.json` を正とし、`npm ci` で CI ランナーを再現できます。
- `npm run dev`：ローカル開発サーバーを `http://localhost:4321` で起動し、ホットリロードを有効にします。リモート検証が必要なときは `npm run dev -- --host` を利用してください。
- `npm run build`：静的 HTML と関連アセットを `dist/` に出力し、ビルド時エラーの検出にも利用します。Netlify など静的ホスティングへデプロイする際はこの成果物をアップロードします。
- `npm run preview`：ビルド成果物をローカルサーバーで検証します。デプロイ前の最終確認に使用し、リンク切れや meta 情報を合わせてチェックしてください。
- `npm run astro -- check`：Astro の型チェックと構成検証を行います。PR 前の品質ゲートとして推奨し、型エラーが発生した場合は `src/env.d.ts` の調整を検討してください。

## コーディングスタイルと命名規則
Astro、TypeScript、TSX（React）ファイルはいずれも 2 スペースインデントを採用してください。コンポーネントは PascalCase、ユーティリティ関数とフックは camelCase、Tailwind クラスは意味の近い順序（レイアウト → サイズ → 色）の塊で記述します。ファイル名は UI コンポーネントで `ComponentName.astro` / `ComponentName.tsx`、データや設定はケバブケース（例：`tour-dates.ts`）を推奨します。コミット前にはエディタで Prettier もしくは公式 Astro 拡張のフォーマット機能を実行し、不要なコンソール出力は削除してください。React コンポーネントの props 型は `type Props = { ... }` の形で宣言し、`src/data` のエクスポートは default export を避けて named export に揃えることで Tree Shaking を支援します。ドキュメントやコピー文言は `GEMINI.md` のトーンを参考にし、スタイル変更を加える際は同ファイルを更新して整合性を保ってください。

## テストガイドライン
現時点で自動テスト基盤は導入されていません。最低限、`npm run astro -- check` と `npm run build` を実行し、型・ビルドエラーを排除してください。UI 変更時は `npm run preview` で実際のページを確認し、主要フロー（トップページ、ライブ情報、フォームなど）を手動で検証します。検証結果は PR コメントに「チェック項目 + ステータス」で記録すると、後続のレビューが容易になります。将来の自動テスト追加時は Playwright 等で `src/pages` 単位のシナリオテストを作成し、ファイル名を `page-name.spec.ts` の形で `tests/` ディレクトリに配置する方針を想定しています。アクセシビリティ検証には `npm run dev` 実行中に `npx @astrojs/check --report accessibility` を利用する案も検討してください。

## コミット・プルリクエストガイドライン
Git 履歴は `feat: …` のような Conventional Commits 形式が主体です。新規コミットも `feat`, `fix`, `chore`, `docs` などのタイプを活用し、具体的な変更点を 50 文字以内で要約してください。長いタスクは複数コミットに分割し、最後に squash merge する方が履歴の可読性が高まります。PR では概要、変更理由、確認手順（例：実行したコマンドやスクリーンショット）を箇条書きで明記し、関連 issue や `作成仕様書.md` の該当セクションがあればリンクします。UI に影響がある場合は比較キャプチャを添付し、レビュアーがローカル確認しやすいようにテスト結果ログも共有してください。レビューで指摘された内容は追加コミットで対応し、マージ前に `npm run build` が通ることを再確認してください。

## 運用と設定のヒント
環境変数が必要な場合は `.env` を作成し、`astro.config.mjs` や `src/env.d.ts` で型を定義してから利用してください。機密情報はリポジトリにコミットせず、チーム内では 1Password や Secret Manager を通じて共有します。CI を導入する際は Node.js 18 以上を指定し、`npm ci` → `npm run build` → `npm run astro -- check` の順に実行するとローカルと同じ品質ゲートを再現できます。デプロイ後の不具合は `dist` 出力と `public` の差分を確認し、必要に応じて Rollback 用のタグを `git tag release-YYYYMMDD` の形式で追加してください。
