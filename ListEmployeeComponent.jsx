import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { BsFillTrashFill,BsPencilFill,BsFillEyeFill,BsFillPlusCircleFill } from "react-icons/bs";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/edit/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add/_add');
    }

    render() {
        return (
            <div>
                 <p className="head"><center>SHOBIKA ENTERPRISES</center></p>
                 <div className = "row mt-4">
                    <button  onClick={this.addEmployee}><BsFillPlusCircleFill/>  Add Complaint</button>
                 </div>
                 <br></br>
                 <div className = "card p-5 row cardshadow3">
                        <table className = "table table-bordered">
                            

                            <thead>
                                <tr>
                                    
                                    <th className='text-center'>Id No</th>
                                    
                                    <th className='text-center'> Name</th>
                                    <th className='text-center'> Category</th>
                                    <th className='text-center'> Problem </th>

                                    <th className='text-center'> Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            <td>{employee.id}</td>
                                             <td> {employee.name} </td>  
                                             <td> {employee.category}</td>
                                             <td> {employee.problem}</td>

                                             <td className='text-center'>
                                                 <button onClick={ () => this.viewEmployee(employee.id)} >VIEW</button>
                                                 <button onClick={ () =>
                                                    
                                                    
                                                    this.editEmployee(employee.id)} >EDIT</button>
                                                 <button onClick={ () => this.deleteEmployee(employee.id)}>DELETE</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
