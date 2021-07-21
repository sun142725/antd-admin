
import { useState } from 'react'
import { Form, Input, Switch, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './lego.less';

import { getCaretPosition, setCaretPosition } from '@/utils/utils'

const FormItem = Form.Item;

export default (props: any) => {
  const propsFlag = true
  const showTypeList = ['title', 'pic', 'desc']
  const { getValue, setValues } = props
  const [showDetail, setShowDetail] = useState(false)
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
      md: { span: 10 },
    },
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const getShowDetail = (name: string)=>{
    if(propsFlag && !showDetail){
      return false
    }
    return showTypeList?.includes(name)
  }
  /**
   * 字符串指定位置插入指定字符
   * @param source 原字符串
   * @param str 需要插入的字符串
   * @param index 操作位置(下标)
   */
  const insertStr = (source: string, str: string, index: number) => {
    return source.slice(0, index) + str + source.slice(index)
  }
  const insertUserName = (id)=>{
    let ele = document.getElementById(id)
    let index = getCaretPosition(ele)
    let s = "{用户昵称}"
    let str = insertStr(getValue(id), s, index)
    setValues({[id]: str})

    setTimeout(()=>setCaretPosition(ele, index+s.length), 200)
  }

  return (
    <>
      {propsFlag && <FormItem {...formItemLayout} label={"关注参与"} name="is_open">
        <FormItem name="1" noStyle>
          <Switch onChange={(value)=>setShowDetail(value)} />
        </FormItem>
        <span>注意：因微信政策原因，选择此选项有封号的风险;仅在H5中有效</span>
      </FormItem>}
      {getShowDetail('title') && <FormItem {...formItemLayout} label={"关注回复图文标题"} name="reply_title" rules={[{required: true, message: `请输入关注回复图文标题`}]}>
        <FormItem name="reply_title">
          <Input placeholder="请输入关注回复图文标题" id="reply_title" />
        </FormItem>
        <Button onClick={()=>insertUserName('reply_title')}>插入用户昵称</Button>
      </FormItem>}
      {getShowDetail('pic') && <FormItem
        {...formItemLayout}
        label={"关注回复封面"}
        name="reply_pic_url"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true }]}
      >
        <FormItem name="reply_pic_url" noStyle>
          <Upload name="logo" action="/upload.do" maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>图片上传</Button>
          </Upload>
        </FormItem>
        <div className={styles.tip}>建议尺寸：750*120或等比图片。</div>
      </FormItem>}
      {getShowDetail('desc') && <FormItem
        {...formItemLayout}
        label={"关注回复图文简介"}
        name="reply_desc"
        rules={[{ required: true, message: '请填写关注回复图文简介' }]}
      >
        <FormItem name="reply_desc" noStyle>
          <Input.TextArea id="reply_desc" placeholder="请输入关注回复图文简介" />
        </FormItem>
        <Button onClick={()=>insertUserName('reply_desc')}>插入用户昵称</Button>
        <div className={styles.tip}>注：分享到朋友圈时，只显示分享标题</div>
      </FormItem>}
    </>
  );
};
