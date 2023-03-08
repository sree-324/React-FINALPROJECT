import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            idNo:'',
            name: '',
            category: '',
            problem:''
        }
        this.changeIdNoHandler = this.changeIdNoHandler.bind(this);

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeProblemHandler = this.changeProblemHandler.bind(this);
        
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({
                idNo: employee.idNo,
                name: employee.name,
                category: employee.category,
                problem: employee.problem
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {idNo: this.state.idNo,name: this.state.name, category: this.state.category, problem: this.state.problem};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
    changeIdNoHandler= (event) => {
    
        this.setState({idNo: event.target.value});
    }
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
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

    render() {
        return (
            <div>
                <br></br>
                   <div >
                        <div className = "row">
                            <div >
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Id NO: </label>
                                            <input placeholder="IdNo" name="idNo" className="form-control" 
                                                value={this.state.idNo} onChange={this.changeIdNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>  Name: </label>
                                            <input placeholder=" Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
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
                                        
                                        

                                        <button className="btn btn-success" onClick={this.updateEmployee}>File It</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent