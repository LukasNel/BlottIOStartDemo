import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input, Button, Checkbox, InputNumber, Select, Upload, message, Layout, PageHeader, Divider } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

const { Dragger } = Upload;
const { Option } = Select;
const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 32,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 32,
    },
};

const SubmitScreen = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
        props.submitForm(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onValuesChange = (val) => {
        console.log(val);
        for (let key in val) {
            switch (key) {
                case "hourlyrate":
                    props.formValues.hourly_rate.handleChange(val[key]);
                    break;
                case "cv":
                    props.formValues.cv.handleChange(val[key]);
                    break;
            }
        }
    }
    const uploadProps = {
        name: 'file',
        multiple:false,
        maxCount:1,
        action: 'http://127.0.0.1:8000/api/prospect/fileupload/',
        customRequest:({file, onSuccess})=>{
            console.log('upload');
            let formData = new FormData();
            formData.append('filename',file.name);
            formData.append('file',file);
            props.formValues.cv.handleChange(file);
            setTimeout(()=>{
                onSuccess("ok");
            });
            /*axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/prospect/fileupload/',
                data: formData
            })
            .then(res => {
                console.log('Tes',res);
                onSuccess("ok");
            }).catch(function (response) {
                //handle error
                console.log(response);
            });*/
        },
        headers: {
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                //message.success(`${info.file.name} file uploaded successfully`);
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
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
        >

            <Layout>
                <Header className="pageheader header"> <PageHeader
                    className="pageheaderTitle"
                    onBack={() => {
                        props.decrementIndex();
                    }}
                    title="Submit your Details"
                    subTitle=""
                /></Header>
                <Divider />
                <Content className="content" >
                    <Form.Item
                        name='hourlyrate'
                        label="Hourly Rate"
                        labelAlign="left"
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
                            onChange={(value) => { console.log(value); }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Upload your CV"
                        name="cv"
                        labelAlign="left"
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
                    </Form.Item>{/*
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
                        <Dragger {...uploadProps}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>,
                    </Form.Item> */}
                
                </Content>
                <Footer className="footer" style={{ padding: "0px" }}>
                <Divider />
                    <Form.Item {...tailLayout} block>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Footer>
            </Layout>

        </Form>
    );
};

export default SubmitScreen;