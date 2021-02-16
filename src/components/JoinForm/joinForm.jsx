import React, { Component } from 'react';
import JoinScreen from './JoinScreen/joinScreen';
import RegistrationScreen from './RegistrationScreen/registrationScreen';
import SubmitScreen from './SubmitScreen/submitScreen';
import './joinForm.css';


import { UserOutlined ,SolutionOutlined  } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, InputNumber, Select,Upload, Steps, Card, Space} from 'antd';

const { Step } = Steps;

class JoinForm extends Component {
    state = { 
        currentIndex : 0,
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
            }
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
     handleFormSwitch(){
        let componentTemp;
        if(this.state.currentIndex == 0) {           
                console.log("Join",this.state.currentIndex);
                componentTemp =  <Space align="center">
              <JoinScreen incrementIndex={this.incrementIndex}></JoinScreen></Space>  
        }else if(this.state.currentIndex == 1) {
         //   console.log("Registration",this.state.currentIndex);
            componentTemp = (<div>    
            <RegistrationScreen formValues={this.state.formValues} incrementIndex={this.incrementIndex} />
            <p> <Steps>
                <Step onClick={()=>{ this.setState({currentIndex:1})}} onstatus="process" title="Registration" icon={<UserOutlined />} />
                <Step status="wait" title="Details" icon={<SolutionOutlined />} />
            </Steps></p>
            </div>)
        }else if(this.state.currentIndex == 2) {
            console.log("Submit",this.state.currentIndex);
            componentTemp = (<div> <SubmitScreen currency={"R"} />
            <p> <Steps>
                <Step onClick={()=>{ this.setState({currentIndex:1})}} onstatus="finish" title="Registration" icon={<UserOutlined />} />
                <Step onClick={()=>{ this.setState({currentIndex:2})}} status="progress" title="Details" icon={<SolutionOutlined />} />
            </Steps></p>
            </div>)
        }else if(this.state.currentIndex == 0) {
          }
          return componentTemp;
     }
    render() { 
        return ( 
           
                
                    <Card className="form-container" title="Registration Screen"  headStyle = {{fontSize:"25px",fontWeight:"bold"}} bordered>
                    {this.handleFormSwitch()}
                    </Card>
                
           
         );
    }
}
 
export default JoinForm;