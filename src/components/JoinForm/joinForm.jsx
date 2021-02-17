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
     changeTitle = (val)=>{
         this.setState({title:val});
     }
     handleFormSwitch=()=>{
        let componentTemp;
        if(this.state.currentIndex == 0) {           
                console.log("Join",this.state.currentIndex);
            
                componentTemp =  <Space align="center">
              <JoinScreen incrementIndex={this.incrementIndex}></JoinScreen></Space>  
        }else if(this.state.currentIndex == 1) {
         //   console.log("Registration",this.state.currentIndex);
    
            componentTemp = (<div>    
            <RegistrationScreen formValues={this.state.formValues} changeTitle={this.changeTitle} incrementIndex={this.incrementIndex} />
            
            </div>)
        }else if(this.state.currentIndex == 2) {
        //    this.state.title= "Submit your Details";
            console.log("Submit",this.state.currentIndex);
            componentTemp = (<div> <SubmitScreen  changeTitle={this.changeTitle} currency={"R"} />
           
            </div>)
        }else if(this.state.currentIndex == 0) {
          }
          return componentTemp;
     }
    render() { 
        return ( 
           
                
                    <Card className="form-container" title={this.state.title}  headStyle = {{fontSize:"25px",fontWeight:"bold", borderBottom:"1px solid black"}} bordered>
                    {this.handleFormSwitch()}
                    </Card>
                
           
         );
    }
}
 
export default JoinForm;