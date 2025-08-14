'use client'

import React, { useState, useEffect } from 'react'
import { Checkbox, TextField, InputAdornment, Chip, Box, Collapse, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import './CategorySelector.css'

// データ型定義
export interface CategoryItem {
  name: string
  id: number
  children?: CategoryItem[]
}

// 選択されたカテゴリーの情報
export interface SelectedCategory {
  id: number
  name: string
  parentId?: number
  parentName?: string
  path?: string // カテゴリーのパス情報
}

// コンポーネントのプロパティ
export interface CategorySelectorProps {
  categories: CategoryItem[]
  selectedCategories?: SelectedCategory[]
  onSelectionChange?: (selectedCategories: SelectedCategory[]) => void
  placeholder?: string
  showSearchArea?: boolean
  predefinedKeywords?: string[] // 预设关键词
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories = [],
  onSelectionChange,
  placeholder = "キーワードを入力してください",
  showSearchArea = true,
  predefinedKeywords = []
}) => {
  const [internalSelection, setInternalSelection] = useState<SelectedCategory[]>(selectedCategories)
  const [searchKeywords, setSearchKeywords] = useState<string[]>([]) // 複数のキーワード
  const [inputText, setInputText] = useState<string>('') // 直接输入的文本
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  // 外部からの選択状態の変更を反映
  useEffect(() => {
    setInternalSelection(selectedCategories)
  }, [selectedCategories])

  // 選択状態の変更を通知
  const handleSelectionChange = (newSelection: SelectedCategory[]) => {
    setInternalSelection(newSelection)
    onSelectionChange?.(newSelection)
  }

  // 展開/収起状態の切り替え
  const toggleExpanded = (categoryId: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedItems(newExpanded)
  }

  // カテゴリーが選択されているかチェック
  const isCategorySelected = (categoryId: number): boolean => {
    return internalSelection.some(item => item.id === categoryId)
  }

  // 指定したカテゴリーの全ての子が選択されているかチェック
  const isAllChildrenSelected = (category: CategoryItem): boolean => {
    if (!category.children || category.children.length === 0) return false
    return category.children.every(child => {
      const isChildSelected = isCategorySelected(child.id)
      if (child.children && child.children.length > 0) {
        return isChildSelected && isAllChildrenSelected(child)
      }
      return isChildSelected
    })
  }

  // カテゴリー名がキーワードにマッチするかチェック
  const isMatchingKeyword = (categoryName: string, keyword: string): boolean => {
    if (!keyword) return false
    return categoryName.toLowerCase().includes(keyword.toLowerCase())
  }

  // 複数キーワードのいずれかが一致するかチェック
  const isMatchingAnyKeyword = (categoryName: string): boolean => {
    const keywords = getSearchKeywords()
    if (keywords.length === 0) return false
    return keywords.some(keyword => isMatchingKeyword(categoryName, keyword))
  }

  // カテゴリーツリー内にマッチするものがあるかチェック（再帰的）
  const hasMatchInTree = (category: CategoryItem, keyword: string): boolean => {
    if (isMatchingKeyword(category.name, keyword)) return true
    if (category.children) {
      return category.children.some(child => hasMatchInTree(child, keyword))
    }
    return false
  }

  // 検索時に該当カテゴリーを自動展開
  useEffect(() => {
    const keywords = getSearchKeywords()
    if (keywords.length > 0) {
      const newExpanded = new Set<number>()
      
      const expandMatchingCategories = (categories: CategoryItem[]) => {
        categories.forEach(category => {
          // いずれかのキーワードにマッチする場合
          const hasMatch = keywords.some(keyword => hasMatchInTree(category, keyword))
          if (hasMatch) {
            newExpanded.add(category.id)
            if (category.children) {
              expandMatchingCategories(category.children)
            }
          }
        })
      }

      expandMatchingCategories(categories)
      setExpandedItems(newExpanded)
    }
  }, [searchKeywords, inputText, categories])  // カテゴリーパスを生成
  const getCategoryPath = (category: CategoryItem, parentPath: string = ''): string => {
    return parentPath ? `${parentPath} > ${category.name}` : category.name
  }

  // 親カテゴリーの選択/解除（全ての子孫を含む）
  const handleParentToggle = (parentCategory: CategoryItem, parentPath: string = '') => {
    if (!parentCategory.children) return

    const allSelected = isAllChildrenSelected(parentCategory)
    let newSelection = [...internalSelection]

    const getAllDescendantIds = (category: CategoryItem): number[] => {
      let ids: number[] = []
      if (category.children) {
        category.children.forEach(child => {
          ids.push(child.id)
          ids = ids.concat(getAllDescendantIds(child))
        })
      }
      return ids
    }

    const descendantIds = getAllDescendantIds(parentCategory)

    if (allSelected) {
      // 全て選択されている場合は全て解除
      newSelection = newSelection.filter(item => !descendantIds.includes(item.id))
    } else {
      // 一部または全て未選択の場合は全て選択
      const addCategories = (categories: CategoryItem[], currentPath: string) => {
        categories.forEach(category => {
          const categoryPath = getCategoryPath(category, currentPath)
          if (!isCategorySelected(category.id)) {
            newSelection.push({
              id: category.id,
              name: category.name,
              parentId: parentCategory.id,
              parentName: parentCategory.name,
              path: categoryPath
            })
          }
          if (category.children) {
            addCategories(category.children, categoryPath)
          }
        })
      }
      
      addCategories(parentCategory.children, getCategoryPath(parentCategory, parentPath))
    }

    handleSelectionChange(newSelection)
  }

  // 子カテゴリーの選択/解除
  const handleChildToggle = (child: CategoryItem, parent: CategoryItem, parentPath: string = '') => {
    const isSelected = isCategorySelected(child.id)
    let newSelection: SelectedCategory[]

    if (isSelected) {
      // 選択解除
      newSelection = internalSelection.filter(item => item.id !== child.id)
    } else {
      // 選択追加
      const categoryPath = getCategoryPath(child, getCategoryPath(parent, parentPath))
      const selectedCategory: SelectedCategory = {
        id: child.id,
        name: child.name,
        parentId: parent.id,
        parentName: parent.name,
        path: categoryPath
      }
      newSelection = [...internalSelection, selectedCategory]
    }

    handleSelectionChange(newSelection)
  }

  // タグの削除
  const handleChipDelete = (categoryId: number) => {
    const newSelection = internalSelection.filter(item => item.id !== categoryId)
    handleSelectionChange(newSelection)
  }

  // 检索キーワードの変更（直接入力対応）
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  // キーボードイベントの処理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputText === '' && searchKeywords.length > 0) {
      // 输入框为空且有关键词时，删除最后一个关键词
      event.preventDefault()
      setSearchKeywords(searchKeywords.slice(0, -1))
    }
  }

  // 予設キーワードをクリック
  const handleKeywordClick = (keyword: string) => {
    if (searchKeywords.includes(keyword)) {
      // 既に選択されている場合は削除
      setSearchKeywords(searchKeywords.filter(k => k !== keyword))
    } else {
      // 新しいキーワードを追加
      setSearchKeywords([...searchKeywords, keyword])
    }
  }

  // 個別キーワードを削除
  const handleRemoveKeyword = (keywordToRemove: string) => {
    setSearchKeywords(searchKeywords.filter(k => k !== keywordToRemove))
  }

  // 検索をクリア
  const handleClearSearch = () => {
    setSearchKeywords([])
    setInputText('')
  }

  // 検索キーワードを取得（複数キーワード + 输入文本）
  const getSearchKeywords = (): string[] => {
    const keywords = searchKeywords.filter(keyword => keyword.trim() !== '')
    if (inputText.trim()) {
      keywords.push(inputText.trim())
    }
    return keywords
  }

  // カテゴリーアイテムを再帰的にレンダリング
  const renderCategoryItem = (category: CategoryItem, level: number = 0, parentPath: string = '') => {
    const isExpanded = expandedItems.has(category.id)
    const hasChildren = category.children && category.children.length > 0
    const isMatching = isMatchingAnyKeyword(category.name)
    const allChildrenSelected = hasChildren ? isAllChildrenSelected(category) : false
    const categoryPath = getCategoryPath(category, parentPath)
    
    // 第4级深度以后的叶子节点内联显示
    const isDeepLeaf = level >= 3 && !hasChildren
    const shouldShowIcon = level >= 3 && hasChildren // 只有第4级以后且有子节点才显示图标

    return (
      <div key={category.id} className={`category-item ${isDeepLeaf ? 'inline-leaf' : ''}`}>
        {/* カテゴリー項目 */}
        <div 
          className={`category-header level-${level} ${allChildrenSelected ? 'parent-selected' : ''} ${isMatching ? 'matching-item' : ''} ${!hasChildren ? 'leaf-node' : 'parent-node'}`}
          onClick={hasChildren ? () => toggleExpanded(category.id) : undefined}
          style={{ 
            cursor: hasChildren ? 'pointer' : 'default',
            marginLeft: isDeepLeaf ? 0 : 0 // 叶子节点不需要个别缩进，由容器统一控制
          }}
        >
          <div className="category-content" style={{ paddingLeft: isDeepLeaf ? 0 : `${level * 32}px` }}>
            {/* 只有第四级以后且有子节点才显示小箭头 */}
            {shouldShowIcon && (
              <div className="level-indicator">
                <SubdirectoryArrowRightIcon className="arrow-icon" />
              </div>
            )}
            
            <div
              className={`category-checkbox ${allChildrenSelected ? 'checkbox-selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation() // 阻止事件冒泡
                hasChildren ? handleParentToggle(category, parentPath) : handleChildToggle(category, { name: '未分類', id: 0 }, parentPath)
              }}
            >
              <Checkbox
                checked={hasChildren ? allChildrenSelected : isCategorySelected(category.id)}
                size="small"
                className={`unified-checkbox ${(hasChildren ? allChildrenSelected : isCategorySelected(category.id)) ? 'unified-checkbox-selected' : ''}`}
                sx={{
                  color: level === 0 ? 'white' : '#1976d2',
                  '&.Mui-checked': {
                    color: level === 0 ? 'white' : '#1976d2',
                  },
                  padding: '4px',
                }}
              />
            </div>
            
            <span className={`category-name level-${level} ${allChildrenSelected || isCategorySelected(category.id) ? 'text-selected' : ''} ${isMatching ? 'matching-text' : ''}`}>
              {category.name}
            </span>
          </div>
        </div>

        {/* 子カテゴリー */}
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <div className="children-container">
              {/* 分离叶子节点和非叶子节点 */}
              {(() => {
                if (!category.children) return null
                
                const leafChildren = category.children.filter(child => level >= 2 && (!child.children || child.children.length === 0))
                const nonLeafChildren = category.children.filter(child => level < 2 || (child.children && child.children.length > 0))
                
                return (
                  <>
                    {/* 先渲染非叶子节点 */}
                    {nonLeafChildren.map((child) => 
                      renderCategoryItem(child, level + 1, categoryPath)
                    )}
                    
                    {/* 然后渲染叶子节点，添加容器缩进 */}
                    {leafChildren.length > 0 && (
                      <div className="inline-leaf-container" style={{ paddingLeft: `${(level + 1) * 32 + 40}px` }}>
                        {leafChildren.map((child) => 
                          renderCategoryItem(child, level + 1, categoryPath)
                        )}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </Collapse>
        )}
      </div>
    )
  }

  return (
    <div className="category-selector">
      {/* 予設キーワードタグ */}
      {predefinedKeywords.length > 0 && (
        <div className="predefined-keywords">
          <Typography variant="body2" sx={{ marginBottom: 1, color: '#666', fontWeight: 500 }}>
            大分類:
          </Typography>
          <div className="keyword-tags">
            {predefinedKeywords.map((keyword, index) => (
              <Chip
                key={index}
                label={keyword}
                variant="outlined"
                size="small"
                onClick={() => handleKeywordClick(keyword)}
                className={`keyword-chip ${searchKeywords.includes(keyword) ? 'keyword-chip-active' : ''}`}
                clickable
              />
            ))}
          </div>
        </div>
      )}

      {/* 検索エリア */}
      {showSearchArea && (
        <div className="search-area">
          <div className="custom-search-input-container">
            <div className="search-input-wrapper">
              {/* 关键词芯片 */}
              {searchKeywords.map((keyword, index) => (
                <div key={index} className="keyword-chip-wrapper">
                  <span className="keyword-chip-label">{keyword}</span>
                  <button 
                    className="keyword-chip-delete"
                    onClick={() => handleRemoveKeyword(keyword)}
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {/* 实际输入框 */}
              <input
                type="text"
                className="custom-search-input"
                placeholder={inputText === '' ? placeholder : ''}
                value={inputText}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <button className="search-button">検索</button>
        </div>
      )}

      {/* カテゴリー選択エリア */}
      <div className="category-selection">
        {categories.map((category) => renderCategoryItem(category, 0))}
      </div>
    </div>
  )
}

export default CategorySelector
