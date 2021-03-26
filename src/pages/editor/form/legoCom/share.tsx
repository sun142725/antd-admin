
import { useState } from 'react'
import { Form, Input, Switch, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './lego.less';

const FormItem = Form.Item;

export default (props: any) => {
  const [showDetail, setShowDetail] = useState(false)
  const { showFlag, flagName, showTypeList, sloganLabel, sloganName, label, picLabel, picName, picRequired, picHelp, h5Label, h5Name, h5Required, h5Help, miniLabel, miniName, miniRequired, miniHelp } = props
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
    if(showFlag && !showDetail){
      return false
    }
    return showTypeList?.includes(name)
  }

  return (
    <>
      {showFlag && <FormItem {...formItemLayout} label={label} name="is_open">
        <Switch onChange={(value)=>setShowDetail(value)} />
      </FormItem>}
      {getShowDetail('slogan') && <FormItem {...formItemLayout} label={sloganLabel} name="adv_context">
        <Input placeholder="请输入广告语" />
      </FormItem>}
      {getShowDetail('pic') && <FormItem
        {...formItemLayout}
        label={picLabel}
        name="adv_img"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: picRequired }]}
      >
        <FormItem name="adv_img" noStyle>
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>图片上传</Button>
          </Upload>
        </FormItem>
        <div className={styles.tip}>建议尺寸：750*120或等比图片。</div>
      </FormItem>}
      {getShowDetail('h5') && <FormItem
        {...formItemLayout}
        label={h5Label}
        name="h5_url"
        rules={[{ required: h5Required, message: '请填写h5跳转链接' }]}
      >
        <FormItem name="h5_url" noStyle>
          <Input placeholder="请输入h5跳转链接" />
        </FormItem>
        <div className={styles.tip}>{h5Help}</div>
      </FormItem>}
      {getShowDetail('miniprogram') && <FormItem
        {...formItemLayout}
        label={miniLabel}
        name="miniprogram_url"
        rules={[{ required: miniRequired, message: '请选择小程序跳转链接' }]}
      >
        <FormItem name="miniprogram_url" noStyle>
          <Input placeholder="请输入小程序跳转链接" />
        </FormItem>
        <div className={styles.tip}>{miniHelp}</div>
      </FormItem>}
    </>
  );
};
