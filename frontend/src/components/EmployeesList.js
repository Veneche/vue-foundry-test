import {Component} from 'react';
import axios from 'axios';
import Employee from './Employee';
import "./EmployeesList.css";

class EmployeesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            filteredEmployees: [],
            newEmployee: "",
            searchKeyword: "",
            isFiltered: false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
    }
    //get list of employees
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
    //Add new client to db and refresh client list
    async handleAdd(){
        let newEmployeeName = this.state.newEmployee;
        if(newEmployeeName !== ""){
            await axios.post("http://localhost:3000/employees",{
                "name": this.state.newEmployee
            })
            .then((response) => {
                console.log(response);
                alert(`${newEmployeeName} added successfully`);
            }, (error) => {
                console.log(error);
            });
            this.getEmployees();
            this.clearInput();
        } else {
            //if input is blank, display error to user
            alert("Please enter an employee name");
        }
        
    }

    handleFilter(){
        let unfilteredEmployees = this.state.employees;
        let filterKeyw = this.state.searchKeyword.toLowerCase();

        console.log(filterKeyw);

        if(filterKeyw.length>0){
            let filteredEmployees = unfilteredEmployees.filter(client => (client.name.toLowerCase().indexOf(filterKeyw) > -1));

            this.setState({
                filteredEmployees: filteredEmployees
            });
            console.log(filteredEmployees);
            this.setState({
                isFiltered: true
            });
        } else {
            this.setState({
                isFiltered: false
            });
        }
       
    }

    //set state to changed input value
    handleNameInputChange(evt){
        this.setState({
            newEmployee: evt.target.value
        });
    }

    handleFilterInputChange(evt){
        this.setState({
            searchKeyword: evt.target.value
        });

        
    }

    //clear newEmployee state and input
    async clearInput(){
        await this.setState({
            newEmployee: ""
        });
    }

    //delete selected client from db
    //display success message
    async removeEmployee(id, name){
        await axios.delete(`http://localhost:3000/employees/${id}`)
        .then((response) => {
            console.log(response);
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
            console.log(response);
            alert(`${newName} updated successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEmployees();
    }


    render(){
        return(
            <div className="EmployeesList">
                <div className="EmployeesList-add-filter">
                    <div className="EmployeesList-filter">
                        <label>
                        <span className="EmployeesList-label">Filter By Employee Name:</span>
                            <input type="text" onChange={this.handleFilterInputChange} placeholder="Enter Keyword" value={this.state.searchKeyword}/>
                            <button onClick={this.handleFilter}>Filter</button>
                            
                        </label>
                    </div>
                    
                    <div className="EmployeesList-add">
                        <label>
                            <span className="EmployeesList-label">Add New Employee:</span>
                            <input type="text" onChange={this.handleNameInputChange} placeholder="Client Name" value={this.state.newEmployee}/>
                            <button onClick={this.handleAdd}>Add</button>
                        </label>
                    </div>
                    
                      
                </div>
                <div className="EmployeesList-header">
                    <div className="EmployeesList-id">Employee ID</div>
                    <div className="EmployeesList-name">Employee Name</div>
                </div>
                {(this.state.isFiltered) ? (
                    this.state.filteredEmployees.map(emp => <Employee editEmployee={this.editEmployee} removeEmployee={this.removeEmployee} id={emp.id} name={emp.name}/>)
                ) : (
                    this.state.employees.map(emp => <Employee editEmployee={this.editEmployee} removeEmployee={this.removeEmployee} id={emp.id} name={emp.name}/>)
                )}
                
            </div>
            
        );
    }
}

export default EmployeesList;