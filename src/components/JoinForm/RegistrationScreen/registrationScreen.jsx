import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, InputNumber, Select, Upload, Steps, Layout, PageHeader,Divider, message} from 'antd';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

const { Option } = Select;
const { Step } = Steps;
const layout = {
    labelCol: {
        span: 6,
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

const RegistrationScreen = (props) => {
    const [form] = Form.useForm();
    const onCheck = () => {

        form.validateFields().then((values) => {
            console.log('Success:', values);
            props.incrementIndex();
        }).catch(errorInfo => {
            message.error('Error in Form Validation');
            console.log('Error in Form Validation', errorInfo)
        });


    };
    const onValuesChange = (val) => {
        for (let key in val) {
            switch (key) {
                case "firstname":
                    props.formValues.firstname.handleChange(val[key]);
                    break;
                case "lastname":
                    props.formValues.lastname.handleChange(val[key]);
                    break;
                case "age":
                    props.formValues.age.handleChange(val[key]);
                    break;
                case "skills":
                    props.formValues.skills.handleChange(val[key]);
                    break;
                case "techstack":
                    props.formValues.techstack.handleChange(val[key]);
                    break;
            }
        }
    }
  
    let techstack = props.formValues.techstack.items.map((item) => { return <Option key={item}>{item}</Option> });
    let skills = props.formValues.skills.items.map((item) => { return <Option key={item}>{item}</Option> });
    
    return (
        <div>
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{
                    remember: true,
                    firstname: props.formValues.firstname.value,
                    lastname: props.formValues.lastname.value,
                    age: props.formValues.age.value,
                    skills: props.formValues.skills.value,
                    techstack: props.formValues.techstack.value
                }}
                layout="horizontal"
                onValuesChange={onValuesChange}
                onSubmitCapture={onCheck}
            >
                <Layout>
                    <Header className="pageheader header"> <PageHeader
                        className="pageheaderTitle"
                        onBack={() => {
                            props.decrementIndex();
                        }}
                        title="Registration Screen"
                        subTitle=""
                    /></Header>
                    <Divider />
                    <Content className="content">  


                        <Form.Item
                            label="First Name"
                            name="firstname"
                            labelAlign="left"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            labelAlign="left"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your second name.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='age'
                            labelAlign="left"
                            label="Age"
                            rules={[
                                {
                                    type: 'number',
                                    required: true,
                                    message: "Please input your age",
                                    min: 0,
                                    max: 130,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name="skills"
                            labelAlign="left"
                            label="Skills"
                            rules={[{ required: true, message: 'Please fill in your skills.', type: 'array' }]}
                        >
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Please fill in your skills."  >
                                {skills}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="techstack"
                            labelAlign="left"
                            label="Tech Stack"
                            rules={[{ required: true, message: 'Please fill in your tech stack.', type: 'array' }]}
                        >
                            <Select mode="tags" style={{ width: '100%' }} placeholder="Please fill in your tech stack."  >
                                {techstack}
                            </Select>
                        </Form.Item>
                      
                    </Content>
                    <Footer className="footer" style={{padding:"0px"}}>
                    <Divider />
                        <Form.Item {...tailLayout} block>
                            <Button type="primary" htmlType="submit" block >
                                Next
                            </Button>
                        </Form.Item>
                    </Footer>
                </Layout>
            </Form>
        </div>
    );
};

export default RegistrationScreen;