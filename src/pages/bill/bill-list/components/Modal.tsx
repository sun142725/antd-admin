import React, { useEffect, useMemo, useState } from 'react'
import { Modal, Button, message, Input, Form, DatePicker, Radio, Select, Tooltip } from 'antd'
import { billCategoryType, billType, getTitleByValue } from '@/utils/type'
import { insert, InsertParamsType, UpdateParamsType, update } from '@/services/bill'
import moment from 'moment'


const styles = require('../style.less')
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input
const { RangePicker } = DatePicker;

interface props {
  billId?: string
  visible: boolean
  onOk: () => void
  onCancel: () => void
  billInfo?: any
}

const DetailModal: React.FC<any> = React.memo((props: props) => {
  const { visible, billInfo } = props
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const handleCancel = () => {
    props.onCancel()
  }
  const onFinish = (values: InsertParamsType) => {
    console.log(values)
    values.gmt_created = moment(values.gmt_created).format("YYYY-MM-DD HH:mm:ss")
    if(billInfo !== null){
      updateBill(values)
    } else {
      insertBill(values)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
  };

  const updateBill = async (params:any) => {
    await update({...params, id: billInfo.id})
    message.success("修改成功")
    props.onOk()
  }
  const insertBill = async (params:InsertParamsType) => {
    await insert(params)
    message.success("添加成功")
    props.onOk()
  }

  useEffect(()=>{
    if(visible){
      console.log(billInfo)
      if(billInfo !== null){
        form.setFieldsValue({
          title: billInfo.title,
          category: billInfo.category,
          amount: billInfo.amount,
          mark: billInfo.mark,
          type: billInfo.type
        })
      } else {
        form.resetFields()
      }
    }
  }, [visible])


  return (
    <>
      <Modal
        className='data_modal'
        title="添加消费记录"
        visible={visible}
        onCancel={handleCancel}
        okText='确认'
         footer={null}
        bodyStyle={{ overflowY: 'auto', padding: '0 20px' }}>
        <div className={styles.modal_statistic}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label="账单名称"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入账单名称",
              },
            ]}
          >
            <Input placeholder="请输入账单名称" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账单类型"
            initialValue={1}
            name="type"
            rules={[
              {
                required: true,
                message: "请选择账单类型",
              },
            ]}
          >
            <Select
              placeholder="请选择账单类型"
              className={styles.select_status}
              >
              {getTitleByValue(billType).map((item: any) => (
                <Option key={item[0]} value={item[0]}>
                  {item[1]}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账单种类"
            initialValue="FOOD"
            name="category"
            rules={[
              {
                required: true,
                message: "请选择账单种类",
              },
            ]}
          >
            <Select
              placeholder="请选择账单种类"
              className={styles.select_status}
              >
              {getTitleByValue(billCategoryType).map((item: any) => (
                <Option key={item[0]} value={item[0]}>
                  {item[1]}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账单日期"
            initialValue={moment()}
            name="gmt_created"
            rules={[
              {
                required: true,
                message: "请选择账单日期",
              },
            ]}
          >
            <DatePicker showTime={{format: "HH:mm:ss"}}   />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账单金额"
            name="amount"
            rules={[
              {
                required: true,
                message: "请输入账单金额",
              },
            ]}
          >
            <Input placeholder="请输入账单金额" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
            name="mark"
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入注释信息"
              rows={4}
            />

          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            {/* loading={submitting} */}
            <Button type="primary" htmlType="submit" >
              保存
            </Button>
            <Button style={{ marginLeft: 8 }}>
              取消
            </Button>
          </FormItem>
        </Form>
        </div>
      </Modal>
    </>
  )
})

export default DetailModal
