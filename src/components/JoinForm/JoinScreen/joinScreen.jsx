import React, { Component } from 'react';
import "./joinScreen.css"
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, InputNumber, Select,Upload, Space } from 'antd';
class JoinScreen extends Component {
    state = {  }
    render() { 
        return (  <div className="space-align-container">
        <div className="space-align-block">
          <Space align="center">
            <Button type="primary" block onClick={this.props.incrementIndex}>Join With Us</Button>
          </Space>
        </div>
      </div>  );
    }
}
 
export default JoinScreen;