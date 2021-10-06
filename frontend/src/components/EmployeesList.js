import {Component} from 'react';
import axios from 'axios';
import Employee from './Employee';
import "./EmployeesList.css";
import {getEmployees} from "../utils/getData";
import FilterClientEmployee from './FilterClientEmployee';

class EmployeesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            filteredEmployees: [],
            isFiltered: false
        };
        this.addNewEmployee = this.addNewEmployee.bind(this);
        this.filterByEmployee = this.filterByEmployee.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
    }

    //get list of employees
    componentDidMount(){
        this.getEmployees();
    }

    //get list of employees
    async getEmployees(){
        let employees = [];
        
        await getEmployees()
        .then((res) => {
            for(let i = 0; i < res.data.length; i++){
                employees.push(res.data[i]);
            }
            
            this.setState({
                employees: employees
            });
        }, (err) => {
            console.log(err);
        }); 
    }

    //Add new client to db and refresh client list
    async addNewEmployee(newEmployeeName){

        await axios.post("http://localhost:3000/employees",{
            "name": newEmployeeName
        })
        .then((response) => {
            console.log(response);
            alert(`${newEmployeeName} added successfully`);
        }, (error) => {
            console.log(error);
        });

        this.getEmployees();
        this.clearInput();  
        
    }

    //clear newEmployee state and input
    async clearInput(){
        await this.setState({
            newEmployee: ""
        });
    }

    //filter list by employee name
    filterByEmployee(filterKeyw){
        let unfilteredEmployees = this.state.employees;

        if(filterKeyw.length>0){
            let filteredEmployees = unfilteredEmployees.filter(client => (client.name.toLowerCase().indexOf(filterKeyw) > -1));

            this.setState({
                filteredEmployees: filteredEmployees,
                isFiltered: true
            });

        } else {
            //if no keyword entered, change isFiltered to false
            this.setState({
                isFiltered: false
            });
        }  
    }

    //delete selected client from db
    //display success message
    async removeEmployee(id, name){
        await axios.delete(`http://localhost:3000/employees/${id}`)
        .then((response) => {
            alert(`${name} removed successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEmployees();      
    }

    //update client name based on input value
    async editEmployee(id, newName){
        await axios.put(`http://localhost:3000/employees/${id}`,{name: newName})
        .then((response) => {
            alert(`${newName} updated successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEmployees();
    }


    render(){
        return(
            <div className="EmployeesList">
                <FilterClientEmployee role="Employee" filterByEmployee={this.filterByEmployee} addNewEmployee={this.addNewEmployee} />
                
                <div className="EmployeesList-header">
                    <div className="EmployeesList-id">Employee ID</div>
                    <div className="EmployeesList-name">Employee Name</div>
                </div>
                {(this.state.isFiltered) ? (
                    this.state.filteredEmployees.map(emp => <Employee key={emp.id} editEmployee={this.editEmployee} removeEmployee={this.removeEmployee} id={emp.id} name={emp.name}/>)
                ) : (
                    this.state.employees.map(emp => <Employee key={emp.id} editEmployee={this.editEmployee} removeEmployee={this.removeEmployee} id={emp.id} name={emp.name}/>)
                )}
                
            </div>
            
        );
    }
}

export default EmployeesList;