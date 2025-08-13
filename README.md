# HierarchicalSelector Demo

HierarchicalSelectorコンポーネントのデモプロジェクトです。

## 技術スタック

- **Next.js 15** - React フレームワーク (App Router, Webpack)
- **TypeScript** - 型安全性
- **Material-UI (MUI) v6** - UIコンポーネントライブラリ  
- **Jest** - テストフレームワーク
- **React Testing Library** - Reactコンポーネントのテスト
- **Storybook** - コンポーネント開発・ドキュメント化ツール

## HierarchicalSelectorコンポーネント

階層選択UIコンポーネント - 親項目選択で全子項目選択、子項目選択は独立

### 機能特徴

- 親項目（地域名）を選択すると、全ての子項目が自動選択される
- 子項目を個別に選択/解除できる
- 子項目の選択状態は親項目のチェックボックス状態に影響しない
- 青色ベースのデザイン
- JSON形式のデータ構造に対応
- TypeScript完全対応

## 開発環境

### 前提条件
- Node.js 18以上
- npm

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# Storybook起動
npm run storybook

# テスト実行
npm test

# ビルド
npm run build
```

### アクセス方法

- **メインアプリ**: http://localhost:3000 (自動でデモページにリダイレクト)
- **デモページ**: http://localhost:3000/hierarchical-selector
- **Storybook**: http://localhost:6006

## プロジェクト構造

```
src/
├── app/
│   ├── hierarchical-selector/     # デモページ
│   │   └── page.tsx
│   ├── page.tsx                   # ホームページ（リダイレクト）
│   ├── layout.tsx                 # レイアウト
│   └── globals.css                # グローバルスタイル
├── components/
│   ├── HierarchicalSelector/      # メインコンポーネント
│   │   ├── index.tsx              # コンポーネント本体
│   │   └── HierarchicalSelector.css # スタイル
│   └── __tests__/                 # テストファイル
│       └── HierarchicalSelector.test.tsx
└── stories/                       # Storybookストーリー
    └── HierarchicalSelector.stories.tsx
```

## API仕様

### SelectorItem

```typescript
interface SelectorItem {
  r: string        // 表示名
  id: number       // ユニークID
  children?: SelectorItem[]  // 子項目（オプション）
}
```

### HierarchicalSelectorProps

```typescript
interface HierarchicalSelectorProps {
  data: SelectorItem                           // 表示データ
  selectedItems?: number[]                     // 選択済みアイテムID配列
  onSelectionChange?: (selectedItems: number[]) => void  // 選択変更コールバック
}
```

## 使用例

```tsx
import { HierarchicalSelector, SelectorItem } from '@/components/HierarchicalSelector'

const sampleData: SelectorItem = {
  r: "関東",
  id: 1,
  children: [
    { r: "東京都", id: 2 },
    { r: "神奈川", id: 3 },
    { r: "千葉", id: 4 },
    { r: "埼玉", id: 5 },
  ]
}

function App() {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  return (
    <HierarchicalSelector
      data={sampleData}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
    />
  )
}
```
