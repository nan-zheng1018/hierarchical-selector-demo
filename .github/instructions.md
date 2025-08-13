<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Next.js + Material-UI + TypeScript + Storybook Project

このプロジェクトは Next.js、TypeScript、Material-UI (MUI)、Jest、Storybook、Webpack を使用して構築されています。

## 技術スタック

- **Next.js 15** - React フレームワーク (App Router)
- **TypeScript** - 型安全性
- **Material-UI (MUI) v6** - UIコンポーネントライブラリ
- **Jest** - テストフレームワーク
- **React Testing Library** - Reactコンポーネントのテスト
- **Storybook** - コンポーネント開発・ドキュメント化ツール
- **Webpack** - Next.jsに内蔵済み

## コーディング規則

- すべての新しいコンポーネントは TypeScript で記述してください
- MUI の Material Design Guidelines に従ってください
- 'use client' ディレクティブを使用するクライアントコンポーネントと、サーバーコンポーネントを適切に使い分けてください
- テストファイルは `__tests__` フォルダまたは `.test.tsx` 拡張子を使用してください
- MUIコンポーネントのスタイリングには sx prop を使用することを推奨します
- プロップスの型定義には interface を使用してください

## ファイル構造

- `/src/app/` - App Router ページ
- `/src/components/` - 再利用可能なコンポーネント
- `/src/stories/` - Storybookストーリーファイル
- `/src/app/__tests__/` または `*.test.tsx` - テストファイル
- `/.storybook/` - Storybook設定ファイル

## 推奨事項

- アクセシビリティを考慮したコンポーネントを作成してください
- レスポンシブデザインを心がけてください
- パフォーマンスを意識したコードを書いてください
- 新しいコンポーネントを作成する際はStorybookのストーリーも作成してください
