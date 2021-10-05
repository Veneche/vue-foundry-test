import { Component } from "react";
import Dropdown from "react-dropdown";
import "./NewEngagement.css";

class NewEngagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            newClient: "",
            newEmpl: "",
            newDescr: ""
        }
        this.handleNewInputChange = this.handleNewInputChange.bind(this);
        this.handleNewClientChange = this.handleNewClientChange.bind(this);
        this.handleNewEmplChange = this.handleNewEmplChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleNewInputChange(evt){
        const target = evt.target;
        const name = target.name;
        const value = target.value;
   
        this.setState({
            [name]: value
        });
    }

    handleNewClientChange(option){
        const name = option.value;

        this.setState({
            newClient: name
        });
    }

    handleNewEmplChange(option){
        const name = option.value;

        this.setState({
            newEmpl: name
        });
    }

    handleCreate(){
        let name = this.state.newName;
        let client = this.state.newClient;
        let employee = this.state.newEmpl;
        let descr = this.state.newDescr;

        if(name !== "" && client !== "" && employee !== ""){
            this.props.createEngagement(name, client, employee, descr);
        } else {
            alert("Please ensure Name, Client and Employee is filled out");
        }

        this.setState({
            newName: "",
            newClient: "",
            newEmpl: "",
            newDescr: ""
        });
        
    }

    render(){
        const addClientOptions = [];
        this.props.clients.map(client => addClientOptions.push(client.name));

        const addEmployeeOptions = [];
        this.props.employees.map(employee => addEmployeeOptions.push(employee.name));

        return(
            <div className={this.props.class}>
                <div className="NewEngagement-Name-label">Name:</div>
                <input type="text" name="newName" value={this.state.newName} required placeholder="Engagement Name"  onChange={this.handleNewInputChange}/>

                <div className="NewEngagement-Client-label">Client:</div>
                <Dropdown name="newClient" className="NewEngagement-Client-dropdown" options={addClientOptions} onChange={this.handleNewClientChange} value={this.state.newClient} placeholder="Select an option" />

                <div className="NewEngagement-Employee-label">Employee:</div>
                <Dropdown name="newEmpl" className="NewEngagement-Employee-dropdown" options={addEmployeeOptions} onChange={this.handleNewEmplChange} value={this.state.newEmpl} placeholder="Select an option" />

                <div className="NewEngagement-Descr-label">Description:</div>
                <input type="text" placeholder="Engagement Description" name="newDescr"  onChange={this.handleNewInputChange} value={this.state.newDescr}/>

                <button className="NewEngagement-btn" onClick={this.handleCreate}>Create Engagement</button>
            </div>
        );
    }
}

export default NewEngagement;