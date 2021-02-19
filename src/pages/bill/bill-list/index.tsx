import React, { FC, useEffect, useState } from 'react';
import { connect } from 'umi';
import { billCategoryType, getTitleByValue } from '@/utils/type';
import numeral from "numeral"
import { PageContainer } from '@ant-design/pro-layout';
import { list } from '@/services/bill';
import { Table } from '@/components'
import { Search } from './components'
import * as dayjs from 'dayjs'
import styles from './style.less';

interface BillListProps {}

const BillList: FC<BillListProps> = (props) => {
  const [data, setData] = useState({total: 0, list: []});
  const [page, setPage] = useState({pageSize: 15, pageNum: 1})
  const [visible, setVisible] = useState(false)
  console.log(props);
  const columns = [
    {
      title: 'NO.',
      render: (val: string, result: any, index: any) => <div>{index + 1}</div>,
    },
    {
      title: '账单名称',
      dataIndex: 'title',
    },
    {
      title: '账单金额(元)',
      dataIndex: 'amount',
      render: (val: string) => numeral(val).format('0,0')
    },
    {
      title: '账单类型',
      dataIndex: 'category',
      render: (val: string, record: any) => getTitleByValue(billCategoryType, val),
    },
    {
      title: '创建时间',
      dataIndex: 'gmt_created',
      render: (val: string)=> dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '备注',
      dataIndex: 'mark',
    },
  ];

  async function getBillList() {
    var result = await list({...page});
    setData(result.data);
  }
  function handleSearch(params: object) {
    setPage({
      ...page,
      ...params,
      pageNum: 1
    })
  }
  function openModal() {
    setVisible(true)
  }

  useEffect(() => {
    getBillList();
  }, [page]);

  return (
    <PageContainer content="这是我的账单展示">
      <Search onSearch={handleSearch} onClick={openModal} />
      <Table
        columns={columns}
        dataSource={{pageIndex: page.pageNum, totalCount: data.total,list: data.list || []}}
        rowKey="id"
        onChange={(pagination: any = {}) => {
          setPage({
            ...page,
            pageNum: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
    </PageContainer>
  );
};

export default connect(() => ({}))(BillList);
