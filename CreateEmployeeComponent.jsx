import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            idNo: '',
            category:'',
            problem:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeIdNoHandler = this.changeIdNoHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeProblemHandler = this.changeProblemHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    
    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    name: employee.name,
                    IdNo : employee.IdNo,
                    category: employee.category,
                    problem: employee.problem
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            name: this.state.name, 
            idNo: this.state.idNo,
            category: this.state.category,
            problem: this.state.problem

        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeIdNoHandler= (event) => {
        this.setState({idNo: event.target.value});
    }
   
    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeProblemHandler= (event) => {
        this.setState({problem: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Fill to File the Complain</h3>
        }else{
            return <h3>Update</h3>
        }
    }
    render() {
        return (
            <div >
                <br></br><br></br>
                <center><p>SHOBIKA ENTERPRISES</p></center>
                   <div className = "container">
                        <div className = "row">
                            <div >
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>  Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler} />
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Id No : </label>
                                            <input placeholder="ID no" name="id no" className="form-control" 
                                                value={this.state.idNo} onChange={this.changeIdNoHandler}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Category: </label>
                                            <input placeholder="Category" name="category" className="form-control" 
                                                value={this.state.category} onChange={this.changeCategoryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Problem: </label>
                                            <input placeholder="Problem" name="problem" className="form-control" 
                                                value={this.state.problem} onChange={this.changeProblemHandler}/>
                                        </div>
                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateEmployee}><BsCheckCircleFill/>File it</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                         
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
