import React, { useEffect, useState } from 'react'
import { Select, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { billCategoryType, getTitleByValue } from '@/utils/type'
import { useDebounce } from '@/hooks'

import styles from '../style.less'
const { Option } = Select

interface searchProps {
  onSearch: (val?: any) => void
  onClick: (val?: any) => void
}

export default ({ onSearch, onClick }: searchProps) => {
  const [params, setParams] = useState({ title: '', category: "0" })

  const handleParams = (params: any) => {
    params.category = params.category != '0' ? params.category : undefined
    onSearch({...params})
  }

  // 类型与状态变化直接搜索
  useEffect(() => {
    handleParams(params)
  }, [params.category])

  // 输入框输入搜索做防抖操作
  useDebounce(
    () => {
      handleParams(params)
    },
    500,
    [params.title]
  )
  return (
    <div className={styles.data_search_criteria}>
      <Input.Group compact={true} style={{ height: '30px' }}>
        <Input
          style={{ width: '210px' }}
          placeholder={`请输入账单名称查询`}
          value={params.title}
          suffix={<SearchOutlined style={{ cursor: 'pointer' }} />}
          onChange={e => setParams({ ...params, title: e.target.value })}
        />
        <Select
          defaultValue={params.category}
          className={styles.select_status}
          onChange={val => setParams({ ...params, category: val })}
          dropdownMatchSelectWidth={100}>
            <Option value={"0"}>全部</Option>
          {getTitleByValue(billCategoryType).map((item: any) => (
            <Option key={item[0]} value={item[0]}>
              {item[1]}
            </Option>
          ))}
        </Select>
      </Input.Group>
      <Button type='primary' onClick={onClick}>新增</Button>
    </div>
  )
}
