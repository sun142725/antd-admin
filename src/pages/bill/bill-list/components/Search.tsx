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
  const [params, setParams] = useState({ nick: '', category: "0" })

  const handleParams = (params: any) => {
    onSearch({ ...params, category: params.category || undefined })
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
    [params.nick]
  )
  return (
    <div className={styles.data_search_criteria}>
      <Input.Group compact={true} style={{ height: '30px' }}>
        <Input
          style={{ width: '210px' }}
          placeholder={`请输入账单名称查询`}
          value={params.nick}
          suffix={<SearchOutlined style={{ cursor: 'pointer' }} />}
          onChange={e => setParams({ ...params, nick: e.target.value })}
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
