import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, InputNumber, Select,Upload, Steps} from 'antd';
import { UserOutlined ,SolutionOutlined  } from '@ant-design/icons';

const { Option } = Select;
const { Step } = Steps;
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

const RegistrationScreen = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      props.incrementIndex();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const onValuesChange  = (val)=>{
      console.log(val);
  }
  //console.log( props.formValues.techstack.items);

  let techstack = props.formValues.techstack.items.map((item)=>{return <Option key={item}>{item}</Option>});
  let skills = props.formValues.skills.items.map((item)=>{return <Option key={item}>{item}</Option>});
 // console.log(techstack);
  return (
      <div>
        

    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
        firstname: props.formValues.firstname.value,
        lastname: props.formValues.lastname.value,
        age: props.formValues.age.value,
        skills: props.formValues.skills.value,
        techstack: props.formValues.techstack.value
      }}
      onValuesChange ={onValuesChange}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        
      <Form.Item
        label="First Name"
        name="firstname"
        rules={[
          {
            required: true,
            message: 'Please input your first name.',
          },
        ]}
      >
        <Input  onChange={props.formValues.firstname.handleChange} />
      </Form.Item>
        
      <Form.Item
        label="Last Name"
        name="lastname"
        rules={[
          {
            required: true,
            message: 'Please input your second name.',
          },
        ]}
      >
        <Input  onChange={props.formValues.lastname.handleChange} />
      </Form.Item>
      <Form.Item
        name='age'
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 130,
          },
        ]}
      >
        <InputNumber  onChange={props.formValues.age.handleChange} />
      </Form.Item>
      <Form.Item
        name="skills"
        label="Skills"
        rules={[{ required: true, message: 'Please fill in your skills.', type: 'array' }]}
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Please fill in your skills."  onChange={props.formValues.skills.handleChange}>
            {skills}
        </Select>
      </Form.Item>
      <Form.Item
        name="techstack"
        label="Tech Stack"
        rules={[{ required: true, message: 'Please fill in your skills.', type: 'array' }]}
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Please fill in your skills."  onChange={props.formValues.techstack.handleChange}>
         {techstack}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={onCheck} htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
    
    </div>
  );
};

export default RegistrationScreen;