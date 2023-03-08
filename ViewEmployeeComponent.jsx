import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import { Link } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <center><p>SHOBIKA ENTERPRISES</p></center>
                <div className = "card col-md-6 offset-md-3 cardshadow3 mt-5">
                    <h3 className = "text-center mt-3 text-primary"> Filed Complaint</h3>
                    <div className = "card-body">
                        <div className="row">
                                
                                <div className="col-7">

                                        <div className = "row">
                                            <label> Name : </label>
                                            <div className='ml-2'> { this.state.employee.name }</div>
                                        </div>
                                        
                                        <div className = "row">
                                            <label>IdNo : </label>
                                            <div className='ml-2'> { this.state.employee.id}</div>
                                        </div>
                                        <div className = "row">
                                            <label>Category : </label>
                                            <div className='ml-2'> { this.state.employee.category }</div>
                                        </div>
                                        <div className = "row">
                                            <label>Problem: </label>
                                            <div className='ml-2'> { this.state.employee.problem}</div>
                                        </div>
                                </div>
                        </div>
 
                    </div>
                    
                    <Link to='/' className='btn btn-primary mt-2 mb-4'><BsFillArrowLeftCircleFill/> Back to main page</Link>

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
