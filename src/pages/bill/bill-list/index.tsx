import React, { FC, useEffect, useState } from 'react';
import { Space, Modal, message } from 'antd'
import { connect } from 'umi';
import { billCategoryType, getTitleByValue } from '@/utils/type';
import numeral from "numeral"
import { PageContainer } from '@ant-design/pro-layout';
import { list, billDelete } from '@/services/bill';
import { Table } from '@/components'
import { Search, BillModal } from './components'
import * as dayjs from 'dayjs'
import styles from './style.less';

interface BillListProps {}

const BillList: FC<BillListProps> = (props) => {
  const [data, setData] = useState({total: 0, list: []});
  const [page, setPage] = useState({pageSize: 15, pageNum: 1, update: true})
  const [visible, setVisible] = useState(false)
  const [billInfo, setBillInfo] = useState(null)
  const columns = [
    {
      title: 'ID.',
      dataIndex: 'id',
    },
    {
      title: '账单名称',
      dataIndex: 'title',
    },
    {
      title: '账单金额(元)',
      dataIndex: 'amount',
      render: (val: string, record: any) => <span>{record.type == 1 ? '-': '+'}{numeral(val).format('0,0.00')}</span>
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
    {
      title: '操作',
      dataIndex: '',
      render: (val: string, record: any) => (
        <Space size="middle">
            <a onClick={()=>updateBill(record)}>修改</a>
            <a onClick={()=>delBill(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  async function getBillList() {
    setPage({
      ...page,
      update: false
    })
    var result = await list({...page});
    setData(result.data);
  }
  function handleSearch(params: object) {
    setPage({
      ...page,
      ...params,
      pageNum: 1,
      update: true
    })
  }

  const addBill = ()=>{
    setBillInfo(null)
    setVisible(true)
  }
  const updateBill = (record:any)=>{
    setBillInfo(record)
    setVisible(true)
  }
  const delBill =  (record:any)=>{
    Modal.confirm({
      title: '系统提示',
      content: '确定删除该条订单',
      onOk: ()=>{
        billDelete({id: record.id}).then(res => {
          message.success("删除成功")
          setPage({
            ...page,
            update: true
          })
        })
      }
    })
  }
  const onOk = ()=>{
    setPage({
      ...page,
      pageNum: billInfo !== null ? page.pageNum : 1,
      update: true
    })
    setBillInfo(null)
    setVisible(false)
  }

  useEffect(() => {
    if(page.update){
      getBillList();
    }
  }, [page.update]);

  return (
    <PageContainer content="这是我的账单展示">
      <Search onSearch={handleSearch} onClick={()=>addBill()} />
      <Table
        columns={columns}
        dataSource={{...page, pageIndex: page.pageNum, totalCount: data?.total,list: data?.list || []}}
        rowKey="id"
        onChange={(pagination: any = {}) => {
          setPage({
            ...page,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            update: true
          })
        }}
      />
      <BillModal visible={visible} onCancel={()=>setVisible(false)} onOk={()=>onOk()} billInfo={billInfo} />
    </PageContainer>
  );
};

export default connect(() => ({}))(BillList);
