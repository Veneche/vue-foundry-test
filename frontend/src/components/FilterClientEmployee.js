import { Component } from "react";
import "./FilterClientEmployee.css";

class FilterClientEmployee extends Component{
    constructor(props){
        super(props);
        this.state = ({
            filterKeyword: "",
            newName: ""
        });
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    //set filter keyword to changed input value
    handleFilterInputChange(evt){
        this.setState({
            filterKeyword: evt.target.value
        });      
    }

    //handle filter event (parent component)
    handleFilter(){
        let role = this.props.role;
        let kewyword = this.state.filterKeyword.toLowerCase();

        //if client then call filter function of client parent component
        //else call filter function of employee parent component
        if(role.toLowerCase() === "client"){
            this.props.filterByClient(kewyword);
        } else if(role.toLowerCase() === "employee"){
            this.props.filterByEmployee(kewyword);
        }
    }

    //set new client/employee name to changed input value
    handleNameInputChange(evt){
        this.setState({
            newName: evt.target.value
        });
    }

    //handle add new client / employee event
    handleAdd(){
        let role = this.props.role;
        let newName = this.state.newName;

        if(newName !== ""){
            if(role.toLowerCase() === "client"){
                this.props.addNewClient(newName);
            } else if(role.toLowerCase() === "employee"){
                this.props.addNewEmployee(newName);
            }
        } else {
            alert(`Please enter a new ${role} name`);
        }
        
    }

    render(){

        return(
            <div className="FilterClientEmployee">
                <div className="FilterClientEmployee-filter">
                    <label>
                    <span className="FilterClientEmployee-label">Filter By {this.props.role} Name:</span>
                        <input type="text" onChange={this.handleFilterInputChange} placeholder="Enter Keyword" value={this.state.filterKeyword}/>
                        <button onClick={this.handleFilter}>Filter</button>
                        
                    </label>
                </div>
                
                <div className="FilterClientEmployee-add">
                    <label>
                        <span className="FilterClientEmployee-label">Add New {this.props.role}:</span>
                        <input type="text" onChange={this.handleNameInputChange} placeholder={`${this.props.role} Name`} value={this.state.newName}/>
                        <button onClick={this.handleAdd}>Add</button>
                    </label>
                </div>
            </div>
        );
    }
}

export default FilterClientEmployee;