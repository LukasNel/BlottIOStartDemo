import React, { Component } from 'react';
import JoinScreen from './JoinScreen/joinScreen';
import RegistrationScreen from './RegistrationScreen/registrationScreen';
import SubmitScreen from './SubmitScreen/submitScreen';
import './joinForm.css';

import { UserOutlined ,SolutionOutlined  } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, InputNumber, Select,Upload, Steps} from 'antd';

const { Step } = Steps;

class JoinForm extends Component {
    state = { 
        currentIndex : 0,
        formValues:{
            firstname:{
                value:"",
                handleChange:(event)=>{
            //        console.log(`firstname ${value}`);
            console.log(event);
                    let formValues = {...this.state.formValues};
                    formValues.firstname.value=event.target.value;
                    this.setState({formValues:formValues});
                    console.log(`firstname ${this.state.formValues.firstname.value}`);
                }
            },
            lastname:{
                value:"",
                handleChange:(event)=>{
                    //console.log(`lastname ${value}`);
                    let formValues = {...this.state.formValues};
                   formValues.lastname.value=event.target.value;
                    this.setState({formValues:formValues});
                }
            },
            age:{
                value:"",
                handleChange:(event)=>{
                   // console.log(`age ${value}`);
                    let formValues = {...this.state.formValues};
                    formValues.age.value=event.target.value;
                    this.setState({formValues:formValues});
                }
            },
            skills:{
                value:0,
                items:["CSS","HTML","Java"],
                handleChange:(event)=>{
                   // console.log(`skills ${value}`);
                    let formValues = {...this.state.formValues};
                    formValues.skills.value=event.target.value;
                    this.setState({formValues:formValues});
                }
            },
            techstack:{
                value:0,
                items:["Web","Embedded","Backend","Frontend","Full-stack"],
                handleChange:(event)=>{
                  //  console.log(`techstack ${value}`);
                    let formValues = {...this.state.formValues};
                    formValues.techstack.value=event.target.value;
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
                componentTemp = <JoinScreen incrementIndex={this.incrementIndex}  />
        }else if(this.state.currentIndex == 1) {
         //   console.log("Registration",this.state.currentIndex);
            componentTemp = (<div><p> <Steps>
                <Step onClick={()=>{ this.setState({currentIndex:1})}} onstatus="process" title="Registration" icon={<UserOutlined />} />
                <Step status="wait" title="Details" icon={<SolutionOutlined />} />
            </Steps></p>    
            <RegistrationScreen formValues={this.state.formValues} incrementIndex={this.incrementIndex} />
            </div>)
        }else if(this.state.currentIndex == 2) {
            console.log("Submit",this.state.currentIndex);
            componentTemp = (<div><p> <Steps>
                <Step onClick={()=>{ this.setState({currentIndex:1})}} onstatus="finish" title="Registration" icon={<UserOutlined />} />
                <Step onClick={()=>{ this.setState({currentIndex:2})}} status="progress" title="Details" icon={<SolutionOutlined />} />
            </Steps></p> <SubmitScreen currency={"R"} />
            </div>)
        }else if(this.state.currentIndex == 0) {
          }
          return componentTemp;
     }
    render() { 
        return ( 
            <div className="form-container">
                <input type="number" value={this.state.currentIndex} onChange={(event)=>this.changeIndex(event)} />
                {this.handleFormSwitch()}
            </div>
         );
    }
}
 
export default JoinForm;