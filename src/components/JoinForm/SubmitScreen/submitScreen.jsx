import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, InputNumber, Select, Upload, message} from 'antd';
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';

const {Dragger} = Upload;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SubmitScreen = (props) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
     
      
      <Form.Item
        name='hourlyrate'
        label="Hourly Rate"
        rules={[
          {
            type: 'number',
            min: 0,
          },
        ]}
      ><InputNumber
      defaultValue={100}
      min={0}
      formatter={value => `${props.currency}${value}`}
      parser={value => value.replace(props.currency, '')}
      onChange={(value)=>{console.log(value);}}
    />
    </Form.Item>
    <Form.Item
        label="Upload your CV"
        name="cv"
        rules={[
          {
            required: true,
            message: 'Please upload your cv.',
          },
        ]}
      >
       <Upload {...uploadProps}>
       <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubmitScreen;