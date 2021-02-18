import React, { Component } from 'react';
import "./joinScreen.css"
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, InputNumber, Select, Upload, Space, Row, Col, Layout } from 'antd';
const { Content, Footer, Header } = Layout;
class JoinScreen extends Component {
    state = {}
    render() {
        return (
            <Row justify="center" align="middle" style={{ height: "200px", width: "100%" }}>
                <Col justify="center" className="joinbuttoncontainer" span={12} >
                        <Button justify="center" 
                                shape="round" 
                                size="large"  
                                className="joinbutton" 
                                type="primary" 
                                onClick={this.props.incrementIndex} ghost>
                            Join With Us
                        </Button>
                  
                </Col>
            </Row>
        );
    }
}

export default JoinScreen;