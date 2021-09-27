import {Component} from 'react';
import axios from 'axios';
import Employee from './Employee';

class EmployeesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees: []
        }
    }
    componentDidMount(){
        this.getEmployees();
    }
    async getEmployees(){
        let employees = [];
        let res = await axios.get("http://localhost:3000/employees");

        for(let i = 0; i < res.data.length; i++){
            employees.push(res.data[i]);
        }
        
        this.setState({
            employees: employees
        });
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