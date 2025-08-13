'use client'

import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'
import './HierarchicalSelector.css'

// データ型定義
export interface SelectorItem {
  r: string // 表示名
  id: number
  children?: SelectorItem[]
}

// コンポーネントのプロパティ
export interface HierarchicalSelectorProps {
  data: SelectorItem
  selectedItems?: number[]
  onSelectionChange?: (selectedItems: number[]) => void
}

export const HierarchicalSelector: React.FC<HierarchicalSelectorProps> = ({
  data,
  selectedItems = [],
  onSelectionChange,
}) => {
  const [internalSelection, setInternalSelection] = useState<number[]>(selectedItems)

  // 外部からの選択状態の変更を反映
  useEffect(() => {
    setInternalSelection(selectedItems)
  }, [selectedItems])

  // 選択状態の変更を通知
  const handleSelectionChange = (newSelection: number[]) => {
    setInternalSelection(newSelection)
    onSelectionChange?.(newSelection)
  }

  // 親項目の選択/解除 - 全選択のみ実行（見た目は変更しない）
  const handleParentToggle = () => {
    if (!data.children) return

    const childIds = data.children.map(child => child.id)
    const allChildrenSelected = childIds.every(id => internalSelection.includes(id))
    
    let newSelection: number[]
    if (allChildrenSelected) {
      // 全て選択されている場合は全て解除
      newSelection = internalSelection.filter(id => !childIds.includes(id))
    } else {
      // 一部または全て未選択の場合は全て選択
      const uniqueSelection = new Set([...internalSelection, ...childIds])
      newSelection = Array.from(uniqueSelection)
    }
    
    handleSelectionChange(newSelection)
  }

  // 子項目の選択/解除
  const handleChildToggle = (childId: number) => {
    const newSelection = internalSelection.includes(childId)
      ? internalSelection.filter(id => id !== childId)
      : [...internalSelection, childId]
    
    handleSelectionChange(newSelection)
  }

  // 全選択状態かどうかを判定
  const isAllSelected = () => {
    if (!data.children || data.children.length === 0) return false
    
    const childIds = data.children.map(child => child.id)
    return childIds.every(id => internalSelection.includes(id))
  }

  const allSelected = isAllSelected()

  return (
    <div
      className="hierarchical-selector"
    >
      {/* 親項目（地域名）- 全選択時のみ選択スタイル表示 */}
      <div
        className={`parent-header ${allSelected ? 'parent-header-selected' : 'parent-header-unselected'}`}
      >
        <div
          onClick={handleParentToggle}
          className={`parent-clickable ${allSelected ? 'parent-clickable-selected' : 'parent-clickable-unselected'}`}
        >
          <div
            className={`parent-checkbox ${allSelected ? 'parent-checkbox-selected' : 'parent-checkbox-unselected'}`}
          >
            {allSelected && (
              <div className="parent-checkbox-inner" />
            )}
          </div>
          <span
            className={`parent-text ${allSelected ? 'parent-text-selected' : 'parent-text-unselected'}`}
          >
            {data.r}
          </span>
        </div>
      </div>

      {/* 子項目リスト */}
      <div className="children-container">
        <div className="children-list">
          {data.children?.map((child) => {
            const isSelected = internalSelection.includes(child.id)
            return (
              <div key={child.id} className="child-item">
                <div
                  onClick={() => handleChildToggle(child.id)}
                  className={`child-button ${isSelected ? 'child-button-selected' : ''}`}
                >
                  <div className="child-icon">
                    <Checkbox
                      checked={isSelected}
                      size="small"
                      className={`child-checkbox ${isSelected ? 'child-checkbox-selected' : ''}`}
                    />
                  </div>
                  <span className={`child-text ${isSelected ? 'child-text-selected' : ''}`}>
                    {child.r}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HierarchicalSelector
