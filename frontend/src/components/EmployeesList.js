import {Component} from 'react';
import {v4 as uuidv4} from 'uuid';
import Employee from './Employee';

class EmployeesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [
                {id:"ec017813-ad03-494f-8ab5-affb9194f43b", name: "Bob"},
                {id:"b2e3c0f9-8600-43b2-888f-3a9c58453997", name: "Alice"},
                {id:"ac5d9c98-3e24-4319-b0ac-c424040cf0a6", name: "Charlie"}
            ]
        }
    }
    render(){
        return(
            <div>
                {this.state.employees.map(emp => <Employee name={emp.name}/>)}
            </div>
            
        );
    }
}

export default EmployeesList;