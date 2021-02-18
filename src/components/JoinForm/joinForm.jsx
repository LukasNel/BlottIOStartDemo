import React, { Component } from 'react';
import JoinScreen from './JoinScreen/joinScreen';
import RegistrationScreen from './RegistrationScreen/registrationScreen';
import SubmitScreen from './SubmitScreen/submitScreen';
import './joinForm.css';

import { UserOutlined ,SolutionOutlined  } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, InputNumber, Select,Upload, Steps, Card, Space, Layout, PageHeader,message, Row, Col } from 'antd';
import axios from 'axios';
const { Step } = Steps;
const { Header, Footer, Sider, Content } = Layout;

class JoinForm extends Component {
    state = { 
        currentIndex : 0,
        title:"",
        formValues:{
            firstname:{
                value:"",
                handleChange:(value)=>{
            
                    let formValues = {...this.state.formValues};
                    formValues.firstname.value=value;
                    this.setState({formValues:formValues});
                    console.log(`firstname ${this.state.formValues.firstname.value}`);
                }
            },
            lastname:{
                value:"",
                handleChange:(value)=>{
               
                    let formValues = {...this.state.formValues};
                   formValues.lastname.value=value;
                    this.setState({formValues:formValues});
                }
            },
            age:{
                value:"",
                handleChange:(value)=>{
                   
                    let formValues = {...this.state.formValues};
                    formValues.age.value=value;
                    this.setState({formValues:formValues});
                }
            },
            skills:{
                value:[],
                items:["CSS","HTML","Java"],
                handleChange:(value)=>{
                   
                    let formValues = {...this.state.formValues};
                    formValues.skills.value=value;
                    this.setState({formValues:formValues});
                }
            },
            techstack:{
                value:[],
                items:["Web","Embedded","Backend","Frontend","Full-stack"],
                handleChange:(value)=>{
                    let formValues = {...this.state.formValues};
                    formValues.techstack.value=value;
                    this.setState({formValues:formValues});
                }
            },
            hourly_rate:{
                value:0,
                handleChange:(value)=>{
                  
                    let formValues = {...this.state.formValues};
                    formValues.hourly_rate.value=value;
                    this.setState({formValues:formValues});
                }
            },
            cv:{
                value:null,
                handleChange:(value)=>{
                   console.log(`cv`, value);
                    let formValues = {...this.state.formValues};
                    formValues.cv.value=value;
                    this.setState({formValues:formValues});
                }
            },
        }
     }
     changeIndex = (event)=>{
        let val = event.target.value;
        if(val > 2)val = 0;
        if(val < 0)val = 2;
        this.setState({currentIndex:val});
     }
     incrementIndex = () =>{
        let val = this.state.currentIndex + 1;
        if(val > 2)val = 0;
        if(val < 0)val = 2;
        this.setState({currentIndex:val});
     }
     decrementIndex = () =>{
        let val = this.state.currentIndex - 1;
        if(val > 2)val = 0;
        if(val < 0)val = 2;
        this.setState({currentIndex:val});
     }
     changeTitle = (val)=>{
         this.setState({title:val});
     }
     submitForm = (values)=>{
         let formData = new FormData();
         formData.append('firstname', this.state.formValues.firstname.value);
         formData.append('lastname', this.state.formValues.lastname.value);
         formData.append('age', this.state.formValues.age.value);
         formData.append('skills', this.state.formValues.skills.value);
         formData.append('techstack', this.state.formValues.techstack.value);
         formData.append('hourly_rate', this.state.formValues.hourly_rate.value);
         formData.append('cv', this.state.formValues.cv.value);
         axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/prospect/',
            headers: {'Content-Type': 'multipart/form-data' },
            data: formData
        })
        .then(res => {
            message.success(`Submitted successfully`);
        }).catch(function (response) {
            //handle error
            message.error('Error with Submission');
            console.log(response);
        });
     }
     getTitle = ()=>{
            if(this.state.currentIndex == 0) {           
                return "";
            }else if(this.state.currentIndex == 1) {
                return "Registration Screen";
            }else if(this.state.currentIndex == 2) {
                return "Submit your Details";
                
            }else if(this.state.currentIndex == 0) {
            }
     }
     handleFormSwitch=()=>{
        let componentTemp;
        if(this.state.currentIndex == 0) {           
            componentTemp =  <JoinScreen 
                                incrementIndex={this.incrementIndex} />;
        }else if(this.state.currentIndex == 1) {
            componentTemp = (
                <div>    
                    <RegistrationScreen 
                        formValues={this.state.formValues} 
                        changeTitle={this.changeTitle} 
                        decrementIndex = {this.decrementIndex} 
                        incrementIndex={this.incrementIndex} />
                </div>)
        }else if(this.state.currentIndex == 2) {
            componentTemp = (
                <div> 
                    <SubmitScreen  
                        formValues={this.state.formValues} 
                        decrementIndex = {this.decrementIndex} 
                        submitForm={this.submitForm} 
                        changeTitle={this.changeTitle} 
                        currency={"R"} />
            
                </div>)
        }else if(this.state.currentIndex == 0) {
        }
        return componentTemp;
     }
    render() { 
        return ( 
            <Row justify="center" align="middle" style={{height:"100vh"}}>
                <Col span={6} xs={24} sm={6} >
                    <Layout className="form-container">
                        {this.handleFormSwitch()}
                    </Layout>
                </Col>
          </Row>              
           
         );
    }
}
 
export default JoinForm;