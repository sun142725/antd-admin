
import { useState } from 'react'
import { Form, Input, Switch, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './lego.less';

const FormItem = Form.Item;

export default (props: any) => {
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
    return true
    // if(showFlag && !showDetail){
    //   return false
    // }
    // return showTypeList?.includes(name)
  }

  return (
    <>
      {true && <FormItem {...formItemLayout} label={"关注参与"} name="is_open">
        <FormItem name="1" noStyle>
          <Switch onChange={(value)=>setShowDetail(value)} />
        </FormItem>
        <span>注意：因微信政策原因，选择此选项有封号的风险;仅在H5中有效</span>
      </FormItem>}
      {getShowDetail('slogan') && <FormItem {...formItemLayout} label={"关注回复图文标题"} name="adv_context" rules={[{required: true, message: `请输入关注回复图文标题`}]}>
        <Input placeholder="请输入关注回复图文标题" />
      </FormItem>}
      {getShowDetail('pic') && <FormItem
        {...formItemLayout}
        label={"关注回复封面"}
        name="adv_img"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true }]}
      >
        <FormItem name="adv_img" noStyle>
          <Upload name="logo" action="/upload.do" maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>图片上传</Button>
          </Upload>
        </FormItem>
        <div className={styles.tip}>建议尺寸：750*120或等比图片。</div>
      </FormItem>}
      {getShowDetail('h5') && <FormItem
        {...formItemLayout}
        label={"关注回复图文简介"}
        name="h5_url"
        rules={[{ required: true, message: '请填写关注回复图文简介' }]}
      >
        <FormItem name="h5_url" noStyle>
          <Input.TextArea placeholder="请输入关注回复图文简介" />
        </FormItem>
        <Button>1243</Button>
        <div className={styles.tip}>注：分享到朋友圈时，只显示分享标题</div>
      </FormItem>}
    </>
  );
};
