'use client'

import React from 'react'
import { Box, Typography, Card, CardContent, Button } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <Box sx={{ 
      maxWidth: 800, 
      margin: '0 auto', 
      padding: 3,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Typography variant="h3" gutterBottom sx={{ 
        color: '#333', 
        fontWeight: 600,
        marginBottom: 4,
        textAlign: 'center'
      }}>
        React コンポーネントデモ
      </Typography>
      
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* 階層選択コンポーネント */}
        <Card sx={{ height: 'fit-content' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
              階層選択コンポーネント
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2, lineHeight: 1.6 }}>
              親項目を選択すると全ての子項目が選択される階層的な選択UIです。
              地域選択などに適用できます。
            </Typography>
            <Link href="/hierarchical-selector" passHref>
              <Button variant="contained" color="primary" fullWidth>
                デモを見る
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* カテゴリー選択コンポーネント */}
        <Card sx={{ height: 'fit-content' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 600 }}>
              カテゴリー選択コンポーネント
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2, lineHeight: 1.6 }}>
              検索機能付きの階層的カテゴリー選択UIです。
              選択されたアイテムはタグ形式で表示され、業種選択などに適用できます。
            </Typography>
            <Link href="/category-selector" passHref>
              <Button variant="contained" color="primary" fullWidth>
                デモを見る
              </Button>
            </Link>
          </CardContent>
        </Card>

      </Box>
    </Box>
  )
}