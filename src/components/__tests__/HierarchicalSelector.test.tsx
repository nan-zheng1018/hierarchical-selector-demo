/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { HierarchicalSelector, SelectorItem } from '../HierarchicalSelector/index'

// テスト用のサンプルデータ
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

const sampleDataWithoutChildren: SelectorItem = {
  r: "北海道",
  id: 10,
  children: []
}

const mockOnSelectionChange = jest.fn()

describe('HierarchicalSelector', () => {
  beforeEach(() => {
    mockOnSelectionChange.mockClear()
  })

  describe('基本的なレンダリング', () => {
    test('親項目が正しく表示される', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      expect(screen.getByText('関東')).toBeInTheDocument()
    })

    test('子項目が正しく表示される', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      expect(screen.getByText('東京都')).toBeInTheDocument()
      expect(screen.getByText('神奈川')).toBeInTheDocument()
      expect(screen.getByText('千葉')).toBeInTheDocument()
      expect(screen.getByText('埼玉')).toBeInTheDocument()
    })

    test('子項目がない場合でも正しく表示される', () => {
      render(
        <HierarchicalSelector
          data={sampleDataWithoutChildren}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      expect(screen.getByText('北海道')).toBeInTheDocument()
    })
  })

  describe('選択状態の表示', () => {
    test('初期選択状態が正しく反映される', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 3]} // 東京都、神奈川が選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // MUIのCheckboxのみを確認（子項目のみ）
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes).toHaveLength(4) // 子項目のみ
      expect(checkboxes[0]).toBeChecked() // 東京都
      expect(checkboxes[1]).toBeChecked() // 神奈川
      expect(checkboxes[2]).not.toBeChecked() // 千葉
      expect(checkboxes[3]).not.toBeChecked() // 埼玉
    })

    test('全ての子項目が選択されている場合、親項目も選択状態になる', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 3, 4, 5]} // 全ての子項目が選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目のチェックボックスが選択状態になっているか確認
      const parentContainer = screen.getByText('関東').closest('.parent-clickable')
      expect(parentContainer).toHaveClass('parent-clickable-selected')
    })

    test('一部の子項目が選択されている場合、親項目は未選択状態になる', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 3]} // 一部の子項目のみ選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目のチェックボックスが未選択状態になっているか確認
      const parentContainer = screen.getByText('関東').closest('.parent-clickable')
      expect(parentContainer).toHaveClass('parent-clickable-unselected')
    })
  })

  describe('親項目の操作', () => {
    test('親項目をクリックすると全ての子項目が選択される', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目をクリック
      const parentClickable = screen.getByText('関東').closest('.parent-clickable')
      await user.click(parentClickable!)

      // onSelectionChangeが全ての子項目IDで呼ばれることを確認
      expect(mockOnSelectionChange).toHaveBeenCalledWith([2, 3, 4, 5])
    })

    test('全選択状態で親項目をクリックすると全ての子項目が解除される', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 3, 4, 5]} // 全て選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目をクリック
      const parentClickable = screen.getByText('関東').closest('.parent-clickable')
      await user.click(parentClickable!)

      // onSelectionChangeが空配列で呼ばれることを確認
      expect(mockOnSelectionChange).toHaveBeenCalledWith([])
    })

    test('一部選択状態で親項目をクリックすると全ての子項目が選択される', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 3]} // 一部選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目をクリック
      const parentClickable = screen.getByText('関東').closest('.parent-clickable')
      await user.click(parentClickable!)

      // onSelectionChangeが全ての子項目IDで呼ばれることを確認
      expect(mockOnSelectionChange).toHaveBeenCalledWith([2, 3, 4, 5])
    })
  })

  describe('子項目の操作', () => {
    test('子項目をクリックすると選択状態が切り替わる', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 東京都の子項目ボタンをクリック
      const tokyoButton = screen.getByText('東京都').closest('.child-button')
      await user.click(tokyoButton!)

      // onSelectionChangeが正しいIDで呼ばれることを確認
      expect(mockOnSelectionChange).toHaveBeenCalledWith([2])
    })

    test('選択済みの子項目をクリックすると選択が解除される', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2]} // 東京都が選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 東京都の子項目ボタンをクリック
      const tokyoButton = screen.getByText('東京都').closest('.child-button')
      await user.click(tokyoButton!)

      // onSelectionChangeが空配列で呼ばれることを確認
      expect(mockOnSelectionChange).toHaveBeenCalledWith([])
    })

    test('複数の子項目を順次選択できる', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2]} // 東京都が選択済み
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 神奈川の子項目ボタンをクリック
      const kanagawaButton = screen.getByText('神奈川').closest('.child-button')
      await user.click(kanagawaButton!)

      // onSelectionChangeが正しいIDの配列で呼ばれることを確認
      expect(mockOnSelectionChange).toHaveBeenCalledWith([2, 3])
    })
  })

  describe('プロパティの変更に対する反応', () => {
    test('selectedItemsプロパティが変更されると内部状態が更新される', () => {
      const { rerender } = render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 初期状態では何も選択されていない
      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked()
      })

      // selectedItemsを変更してre-render
      rerender(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 3]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 東京都と神奈川が選択状態になっていることを確認
      const updatedCheckboxes = screen.getAllByRole('checkbox')
      expect(updatedCheckboxes[0]).toBeChecked() // 東京都
      expect(updatedCheckboxes[1]).toBeChecked() // 神奈川
      expect(updatedCheckboxes[2]).not.toBeChecked() // 千葉
      expect(updatedCheckboxes[3]).not.toBeChecked() // 埼玉
    })
  })

  describe('エッジケース', () => {
    test('onSelectionChangeが提供されていない場合でもエラーが発生しない', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
        />
      )

      // 親項目をクリックしてもエラーが発生しないことを確認
      const parentClickable = screen.getByText('関東').closest('.parent-clickable')
      await expect(user.click(parentClickable!)).resolves.not.toThrow()

      // 子項目をクリックしてもエラーが発生しないことを確認
      const tokyoButton = screen.getByText('東京都').closest('.child-button')
      await expect(user.click(tokyoButton!)).resolves.not.toThrow()
    })

    test('子項目が存在しない場合、親項目のクリックが正常に動作する', async () => {
      const user = userEvent.setup()
      
      render(
        <HierarchicalSelector
          data={sampleDataWithoutChildren}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目をクリック
      const parentClickable = screen.getByText('北海道').closest('.parent-clickable')
      await user.click(parentClickable!)

      // onSelectionChangeが空配列で呼ばれることを確認（子項目がないため）
      expect(mockOnSelectionChange).toHaveBeenCalledWith([])
    })

    test('空の選択配列が渡された場合の動作', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // すべてのチェックボックスが未選択状態であることを確認
      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked()
      })
    })

    test('存在しないIDが選択配列に含まれている場合の動作', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[999]} // 存在しないID
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // すべてのチェックボックスが未選択状態であることを確認
      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked()
      })
    })

    test('重複したIDが選択配列に含まれている場合の動作', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[2, 2, 3, 3]} // 重複あり
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 東京都と神奈川のチェックボックスが選択状態であることを確認
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes[0]).toBeChecked() // 東京都
      expect(checkboxes[1]).toBeChecked() // 神奈川
      expect(checkboxes[2]).not.toBeChecked() // 千葉
      expect(checkboxes[3]).not.toBeChecked() // 埼玉
    })
  })

  describe('アクセシビリティ', () => {
    test('すべてのチェックボックスに適切なroleが設定されている', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // MUIのチェックボックスのみが存在することを確認（子項目4個のみ）
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes).toHaveLength(4)
    })

    test('親項目と子項目のテキストが正しく表示される', () => {
      render(
        <HierarchicalSelector
          data={sampleData}
          selectedItems={[]}
          onSelectionChange={mockOnSelectionChange}
        />
      )

      // 親項目のテキスト
      expect(screen.getByText('関東')).toBeInTheDocument()

      // 子項目のテキスト
      expect(screen.getByText('東京都')).toBeInTheDocument()
      expect(screen.getByText('神奈川')).toBeInTheDocument()
      expect(screen.getByText('千葉')).toBeInTheDocument()
      expect(screen.getByText('埼玉')).toBeInTheDocument()
    })
  })
})
