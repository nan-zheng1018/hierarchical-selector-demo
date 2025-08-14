'use client'

import { useState } from 'react'
import { HierarchicalSelector, SelectorItem } from '@/components/HierarchicalSelector/index'
import { Box, Container, Typography, Paper } from '@mui/material'

// サンプルデータ
const sampleData: SelectorItem = {
  r: "近畿",
  id: 1,
  children: [
    { r: "大阪", id: 2 },
    { r: "兵庫", id: 3 },
    { r: "京都", id: 4 },
    { r: "奈良", id: 5 },
    { r: "滋賀", id: 6 },
    { r: "和歌山", id: 7 },
  ]
}

const kantoData: SelectorItem = {
  r: "関東",
  id: 10,
  children: [
    { r: "東京都", id: 11 },
    { r: "神奈川", id: 12 },
    { r: "千葉", id: 13 },
    { r: "埼玉", id: 14 },
    { r: "茨城", id: 15 },
    { r: "栃木", id: 16 },
    { r: "群馬", id: 17 },
  ]
}

export default function HierarchicalSelectorDemo() {
  const [kinkiSelection, setKinkiSelection] = useState<number[]>([5]) // 奈良が初期選択
  const [kantoSelection, setKantoSelection] = useState<number[]>([])

  const handleKantoSelectionChange = (ids: number[]) => {
    console.log(ids)
    setKantoSelection(ids)
  }

  // IDから地域名を取得する関数
  const getRegionNames = (data: SelectorItem, selectedIds: number[]): string[] => {
    const names: string[] = []
    if (data.children) {
      data.children.forEach(child => {
        if (selectedIds.includes(child.id)) {
          names.push(child.r)
        }
      })
    }
    return names
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        地域選択コンポーネント
      </Typography>

      <Box display="flex" justifyContent="center" gap={4} mb={4}>
        <Box>
          <Typography variant="h6" gutterBottom align="center">
            近畿地方
          </Typography>
          <HierarchicalSelector
            data={sampleData}
            selectedItems={kinkiSelection}
            onSelectionChange={setKinkiSelection}
          />
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom align="center">
            関東地方
          </Typography>
          <HierarchicalSelector
            data={kantoData}
            selectedItems={kantoSelection}
            onSelectionChange={handleKantoSelectionChange}
          />
        </Box>
      </Box>

      <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          選択状態:
        </Typography>
        <Box display="flex" gap={4}>
          <Box>
            <Typography variant="subtitle2" color="primary">
              近畿地方の選択: [{getRegionNames(sampleData, kinkiSelection).join(', ')}]
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="secondary">
              関東地方の選択: [{getRegionNames(kantoData, kantoSelection).join(', ')}]
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          機能特徴:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>親項目（地域名）を選択すると、全ての子項目が自動選択される</li>
          <li>子項目を個別に選択/解除できる</li>
          <li>子項目の選択状態は親項目のチェックボックス状態に影響しない</li>
          <li>図と同じ青色ベースのデザイン</li>
          <li>JSON形式のデータ構造に対応</li>
          <li>Storybookでコンポーネントドキュメント化</li>
        </Box>
      </Box>
    </Container>
  )
}
