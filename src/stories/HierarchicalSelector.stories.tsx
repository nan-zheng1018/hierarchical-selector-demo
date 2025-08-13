import type { Meta, StoryObj } from '@storybook/react'
import { HierarchicalSelector, SelectorItem } from '../components/HierarchicalSelector/index'
import { useState } from 'react'
import { Box } from '@mui/material'

// サンプルデータ
const kantoData: SelectorItem = {
  r: "関東",
  id: 1,
  children: [
    { r: "東京都", id: 2 },
    { r: "神奈川", id: 3 },
    { r: "千葉", id: 4 },
    { r: "埼玉", id: 5 },
    { r: "茨城", id: 6 },
    { r: "栃木", id: 7 },
    { r: "群馬", id: 8 },
  ]
}

const kinkiData: SelectorItem = {
  r: "近畿",
  id: 10,
  children: [
    { r: "大阪", id: 11 },
    { r: "兵庫", id: 12 },
    { r: "京都", id: 13 },
    { r: "奈良", id: 14 },
    { r: "滋賀", id: 15 },
    { r: "和歌山", id: 16 },
  ]
}

const meta: Meta<typeof HierarchicalSelector> = {
  title: 'Components/HierarchicalSelector',
  component: HierarchicalSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '階層選択コンポーネント。親項目を選択すると全ての子項目が選択されます。子項目の選択は親項目の状態に影響しません。',
      },
    },
  },
  argTypes: {
    data: {
      description: '表示するデータ構造',
      control: { type: 'object' },
    },
    selectedItems: {
      description: '選択済みのアイテムIDリスト',
      control: { type: 'object' },
    },
    onSelectionChange: {
      description: '選択状態が変更された時のコールバック',
      action: 'selection-changed',
    },
  },
}

export default meta
type Story = StoryObj<typeof HierarchicalSelector>

// 基本的な使用例
export const Default: Story = {
  args: {
    data: kinkiData,
    selectedItems: [14], // 奈良が選択された状態
  },
}

// 関東地方の例
export const KantoRegion: Story = {
  args: {
    data: kantoData,
    selectedItems: [],
  },
}

// 複数選択済みの状態
export const MultipleSelected: Story = {
  args: {
    data: kinkiData,
    selectedItems: [11, 12, 14], // 大阪、兵庫、奈良が選択済み
  },
}

// 全て選択済みの状態
export const AllSelected: Story = {
  args: {
    data: kinkiData,
    selectedItems: [11, 12, 13, 14, 15, 16], // 全て選択済み
  },
}

// インタラクティブな例（状態管理付き）
export const Interactive: Story = {
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([14])
    
    return (
      <Box>
        <HierarchicalSelector
          {...args}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />
        <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
          <strong>選択されたアイテム:</strong> {selectedItems.join(', ')}
        </Box>
      </Box>
    )
  },
  args: {
    data: kinkiData,
  },
}

// 複数のコンポーネントを並べた例
export const MultipleComponents: Story = {
  render: (args) => {
    const [kantoSelection, setKantoSelection] = useState<number[]>([2, 3])
    const [kinkiSelection, setKinkiSelection] = useState<number[]>([14])
    
    return (
      <Box display="flex" gap={2}>
        <HierarchicalSelector
          data={kantoData}
          selectedItems={kantoSelection}
          onSelectionChange={setKantoSelection}
        />
        <HierarchicalSelector
          data={kinkiData}
          selectedItems={kinkiSelection}
          onSelectionChange={setKinkiSelection}
        />
      </Box>
    )
  },
}
