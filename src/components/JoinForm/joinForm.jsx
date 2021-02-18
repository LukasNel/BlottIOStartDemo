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
            //        console.log(`firstname ${value}`);
            console.log(value)
                    let formValues = {...this.state.formValues};
                    formValues.firstname.value=value;
                    this.setState({formValues:formValues});
                    console.log(`firstname ${this.state.formValues.firstname.value}`);
                }
            },
            lastname:{
                value:"",
                handleChange:(value)=>{
                    //console.log(`lastname ${value}`);
                    let formValues = {...this.state.formValues};
                   formValues.lastname.value=value;
                    this.setState({formValues:formValues});
                }
            },
            age:{
                value:"",
                handleChange:(value)=>{
                   // console.log(`age ${value}`);
                    let formValues = {...this.state.formValues};
                    formValues.age.value=value;
                    this.setState({formValues:formValues});
                }
            },
            skills:{
                value:[],
                items:["CSS","HTML","Java"],
                handleChange:(value)=>{
                   // console.log(`skills ${value}`);
                    let formValues = {...this.state.formValues};
                    formValues.skills.value=value;
                    this.setState({formValues:formValues});
                }
            },
            techstack:{
                value:[],
                items:["Web","Embedded","Backend","Frontend","Full-stack"],
                handleChange:(value)=>{
                  //  console.log(`techstack ${value}`);
                    let formValues = {...this.state.formValues};
                    formValues.techstack.value=value;
                    this.setState({formValues:formValues});
                }
            },
            hourly_rate:{
                value:0,
                handleChange:(value)=>{
                   // console.log(`age ${value}`);
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
         console.log('submitForm',values);
         let formData = new FormData();
         formData.append('firstname', this.state.formValues.firstname.value);
         formData.append('lastname', this.state.formValues.lastname.value);
         formData.append('age', this.state.formValues.age.value);
         formData.append('skills', this.state.formValues.skills.value);
         formData.append('techstack', this.state.formValues.techstack.value);
         formData.append('hourly_rate', this.state.formValues.hourly_rate.value);
         //formData.append('cv', this.state.formValues.cv.value);
         for (var value of formData.values()) {
            console.log(value);
         }
         
         axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/prospect/',
            headers: {'Content-Type': 'multipart/form-data' },
            data: formData
        })
        .then(res => {
           // console.log('Tes',res);
            message.success(`Submitted successfully`);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
     }
     getTitle = ()=>{
            if(this.state.currentIndex == 0) {           
                return "";
            }else if(this.state.currentIndex == 1) {
            //   console.log("Registration",this.state.currentIndex);
                return "Registration Screen";
            }else if(this.state.currentIndex == 2) {
            //    this.state.title= "Submit your Details";
                console.log("Submit",this.state.currentIndex);
                return "Submit your Details";
                
            }else if(this.state.currentIndex == 0) {
            }
     }
     handleFormSwitch=()=>{
        let componentTemp;
        if(this.state.currentIndex == 0) {           
                console.log("Join",this.state.currentIndex);
            
                componentTemp =  <JoinScreen incrementIndex={this.incrementIndex}></JoinScreen>;
        }else if(this.state.currentIndex == 1) {
         //   console.log("Registration",this.state.currentIndex);
    
            componentTemp = (<div>    
            <RegistrationScreen formValues={this.state.formValues} changeTitle={this.changeTitle} decrementIndex = {this.decrementIndex} incrementIndex={this.incrementIndex} />
            
            </div>)
        }else if(this.state.currentIndex == 2) {
        //    this.state.title= "Submit your Details";
            console.log("Submit",this.state.currentIndex);
            componentTemp = (<div> <SubmitScreen  formValues={this.state.formValues} decrementIndex = {this.decrementIndex} submitForm={this.submitForm} changeTitle={this.changeTitle} currency={"R"} />
           
            </div>)
        }else if(this.state.currentIndex == 0) {
          }
          return componentTemp;
     }
    render() { 
        
        return ( 
            <Row justify="center" align="middle" style={{height:"100vh"}}>
            <Col span={6} xs={24} sm={6} ><Layout className="form-container">
             {this.handleFormSwitch()}
             
          </Layout></Col>
          </Row>
                /*    <Card className="form-container" title={this.getTitle()}  headStyle = {{fontSize:"25px",fontWeight:"bold", borderBottom:"1px solid black"}} bordered>
                    {this.handleFormSwitch()}
                    </Card>*/
                
           
         );
    }
}
 
export default JoinForm;