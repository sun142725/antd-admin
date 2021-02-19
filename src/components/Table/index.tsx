import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import config from '@/config'

const styles = require('./index.less')

function noop() {}
export interface StandardTableProps {
  clearTableStyle?: boolean
  showHeader?: boolean
  hideOnSinglePage?: boolean
  rowKey: any
  selectedRows?: Array<any>
  isSelectionCheckbox?: boolean
  dataSource: any
  columns: Array<any>
  selectedRowKeys?: Array<number | string>
  size?: string
  onSelectRow?: (selectedRowKeys: any, selectedRows: any) => void
  onRowSelect?: (record: any, selected: any, selectedRows: any) => void
  onChange?: (pagination: any, filters: any, sorter: any) => void
  onSelectAll?: (selected: any, selectedRows: any, changeRows: any) => void
  getCheckboxProps?: (record: any) => void
  expandable?: object
  hasBorder?: boolean
}

const StandardTable = (props: StandardTableProps) => {
  const {
    clearTableStyle,
    showHeader,
    rowKey,
    selectedRows,
    isSelectionCheckbox,
    dataSource,
    columns,
    size,
    onSelectRow,
    onRowSelect,
    onSelectAll,
    onChange,
    getCheckboxProps,
    expandable,
    hideOnSinglePage,
    hasBorder
  } = props

  const [keys, setKeys] = useState(selectedRows)
  const [sty, setStyle] = useState({
    left: 0,
    right: 0
  })

  useEffect(() => {
    setKeys(selectedRows)
    resizeFooterToolbar()
    window.addEventListener('resize', resizeFooterToolbar)
    return () => {
      window.removeEventListener('resize', resizeFooterToolbar)
    }
  }, [props])

  const resizeFooterToolbar = () => {
    const container: any = document.querySelector(`.weimob-layouts-basic-layout-content`)
    const body: any = document.getElementsByTagName('body')[0]
    if (container == null) {
      return
    }

    const bdWidth = body.clientWidth
    const parPos = container.getBoundingClientRect()

    let left = parPos.x
    let right = bdWidth - parPos.x - parPos.width
    const style = {
      left,
      right
    }
    setStyle(style)
  }

  // 多选
  const handleSelectAll = (selected, selectedRows, changeRows) => {
    if (onSelectAll) {
      onSelectAll(selected, selectedRows, changeRows)
    }
  }

  // 多个单选
  const handleRowSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    if (onSelectRow) {
      onSelectRow(selectedRowKeys, selectedRows)
    }
    setKeys(selectedRowKeys)
  }

  //单个选择
  const handleRowSelect = (record: any, selected: any, selectedRows: any) => {
    if (onRowSelect) {
      onRowSelect(record, selected, selectedRows)
    }
  }

  // 表格分页选择
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (onChange) {
      onChange(pagination, filters, sorter)
    }
  }

  const rowSelection = {
    getCheckboxProps,
    selectedRowKeys: keys,
    onChange: handleRowSelectChange,
    onSelect: handleRowSelect,
    onSelectAll: handleSelectAll
  }

  dataSource.data = dataSource.data || []
  const { data, pageSize, pageIndex, totalCount, list, hidePagination, isFixed } = dataSource
  const total = totalCount || dataSource.data.totalCount || dataSource.data.total
  const result = {
    list: list || data.items || data.data,
    pagination: {
      total,
      pageSize,
      current: parseInt(pageIndex, 10) || 1
    }
  }

  const paginationProps = {
    hideOnSinglePage, // 只有一页隐藏分页组件
    showSizeChanger: true,
    showQuickJumper: true,
    disabled: false,
    showTotal: total => {
      const current = result.pagination.current
      return `共${total || 0}条 当前为第${current}页`
    },
    ...result.pagination
  }

  const tableObj: any = {
    size,
    columns,
    showHeader,
    showSorterTooltip: false,
    rowKey: rowKey || 'key',
    rowSelection: isSelectionCheckbox ? rowSelection : null,
    dataSource: result.list,
    // pagination: paginationProps,
    // hidePagination 判断是否隐藏分页, 需要强制把false类型 当做undefined， 否则ts 语法检验不通过
    pagination: hidePagination ? (false as undefined) : paginationProps,
    onChange: handleTableChange,
    expandable: expandable ? expandable : {}
  }

  const tableNew = Object.assign({}, props, tableObj)

  const left = sty.left > 0 && sty.left < 150 ? styles['isfixed-page-left-1'] : styles['isfixed-page-left-2']
  const right = sty.right > 0 && sty.right < 50 ? styles['isfixed-page-right-1'] : styles['isfixed-page-right-2']
  const cls = `${styles.standardTable} ${isFixed ? `${styles['isfixed-page']} ${left} ${right}` : ''} ${
    clearTableStyle ? 'notablestyle' : ''
  } ${hasBorder ? styles.has_b_border : ''}`

  return <Table className={cls} {...tableNew} />
}

StandardTable.propTypes = {
  // 使用自定义样式, 去除表格的默认样式
  clearTableStyle: PropTypes.bool,
  // 表格关键key
  rowKey: PropTypes.any,
  // 表格复选框选择后的数据
  selectedRows: PropTypes.array,
  // 是否开启多选功能 默认不开启
  isSelectionCheckbox: PropTypes.bool,
  // 表格数据源
  dataSource: PropTypes.object.isRequired,
  // 表格列
  columns: PropTypes.array.isRequired,
  // 选中复选框后回调事件
  onSelectRow: PropTypes.func,
  // 选择分页事件
  onChange: PropTypes.func
}

StandardTable.defaultProps = {
  clearTableStyle: false,
  isSelectionCheckbox: false,
  selectedRows: [],
  showHeader: true,
  onSelectRow: noop,
  onChange: noop
}

export default StandardTable
