import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import * as dayjs from 'dayjs'
import StandardTable from '@/components/Table'

const styles = require('../style.less')
interface props {
  pluginList: Array<any>
  visible: boolean
  userId: string
  taskId?: string
  collectionList: Array<any>
  onCancel: () => void
}

const DetailModal: React.FC<any> = React.memo((props: props) => {
  const { visible } = props



  const handleCancel = () => {
    props.onCancel()
  }


  const Title = <div className={styles.data_modal_header}>邀请详情</div>

  return (
    <>
      <Modal
        className='data_modal'
        title={Title}
        visible={visible}
        onCancel={handleCancel}
        okText='确认'
        width={960}
        footer={null}
        bodyStyle={{ overflowY: 'auto', padding: '0 20px' }}>
        <div className={styles.modal_statistic}>
          12343324
        </div>
      </Modal>
    </>
  )
})

export default DetailModal
