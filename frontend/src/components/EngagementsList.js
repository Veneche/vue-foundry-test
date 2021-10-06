import { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Engagement from "./Engagement";
import NewEngagement from "./NewEngagement";
import {getClients, getClient, getEmployees, getEmployee, getEngagements, getClientEngagements, getEmployeeEngagements} from "../utils/getData";
import axios from "axios";
import queryString from "query-string";
import "./EngagementsList.css";


class EngagementsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            engagements: [],
            clients: [],
            employees: [],
            filteredEngag: [],
            filterOption: "",
            filterKeyw: "",
            isFiltered: false,
            isAdding: false
        };
        this.getNames = this.getNames.bind(this);
        this.getEngagements = this.getEngagements.bind(this);
        this.getClients = this.getClients.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);

        this.handleFilter = this.handleFilter.bind(this);
        this.toggleAddFields = this.toggleAddFields.bind(this);
        this.createEngagement = this.createEngagement.bind(this);

        this.editEngagement = this.editEngagement.bind(this);
        this.endEngagement = this.endEngagement.bind(this);
        this.removeEngagement = this.removeEngagement.bind(this);

    }

    componentDidMount(){
        this.getEngagements();
        this.getClients();
        this.getEmployees();

        //get query paramenters in url
        const searchStr = queryString.parse(this.props.location.search);

        //if query parameters contain entity role and name, set filter option to the role (eg client or employee) and filter keyword to name
        if(searchStr.role && searchStr.name){
            let filter = searchStr.role + " Name";

            this.setState({
                filterOption: filter,
                filterKeyw: searchStr.name
            });

            //if role is client, get engagements by client, else if role is employee, get engagements by employee
            if(searchStr.role === "Client"){
                this.getEngagementsByClient(searchStr.id);
            } else if(searchStr.role === "Employee"){
                this.getEngagementsByEmployee(searchStr.id);
            }
            
        } else {
            //if role and name is not found in query parameters, set default filter option
            this.setState({
                filterOption: "Engagement Name",
            });
        }

        
    }

    //get engagements by client
    async getEngagementsByClient(id){
        let engagements = [];
        await getClientEngagements(id)
        .then((response) => {
            engagements = response.data;

            this.setState({
                filteredEngag: engagements,
                isFiltered: true
            });
            //get client and employee names and add to engagements array
            this.getNames(engagements, true);

        }, (err) => {
            console.log(err);
        });
        
    }

    //get engagements by employee
    async getEngagementsByEmployee(id){
        let engagements = [];
        await getEmployeeEngagements(id)
        .then((response) => {
            engagements = response.data;

            this.setState({
                filteredEngag: engagements,
                isFiltered: true
            });

            //get client and employee names and add to engagements array
            this.getNames(engagements, true);

        }, (err) => {
            console.log(err);
        });
        
    }

    //get clients list
    async getClients(){
        let clients = [];

        await getClients()
        .then((response) => {
            for(let i = 0; i < response.data.length; i++){
                clients.push({
                    "id": response.data[i].id,
                    "name": response.data[i].name
                });
            }
            this.setState({
                clients: clients,
                newClient: clients[0].name
            });
        }, (error) =>{
            console.log(error);
        });
    }

    //get employees list
    async getEmployees(){
        let employees = [];

        await getEmployees()
        .then((response) => {
            for(let i = 0; i < response.data.length; i++){
                employees.push({
                    "id": response.data[i].id,
                    "name": response.data[i].name
                });
            }
            this.setState({
                employees: employees,
                newEmpl: employees[0].name
            });
        }, (error) =>{
            console.log(error);
        });
    }

    //get engagements list
    async getEngagements(){
        let engagements = [];

        await getEngagements()
        .then((response) => {
            for(let i = 0; i < response.data.length; i++){               
                engagements.push({
                    "id": response.data[i].id,
                    "name": response.data[i].name,
                    "client": response.data[i].client,
                    "employee": response.data[i].employee,
                    "started": response.data[i].started,
                    "description": response.data[i].description,
                    "ended": response.data[i].ended
                });                  
            }
            this.getNames(engagements, false);

        }, (error) => {
            console.log(error);
        });
    }

    async getNames(engagements, isFiltered){
        let clientID = "";
        let employeeID = "";
        let clientName = "";
        let employeeName = "";

        //for each engagement, search client and employee ids to find names
        //add clientName and employeeName to engagements array in state
        for(let i = 0; i < engagements.length; i++){
            clientID =  engagements[i].client;
            employeeID =  engagements[i].employee;

             await getClient(clientID)
             .then((response) => {
                clientName = response.data.name;             
                engagements[i] = {...engagements[i],"clientName": clientName};
             }, (error) => {
                console.log(error);
             }); 

             await getEmployee(employeeID)
             .then((response) => {
                employeeName = response.data.name;             
                engagements[i] = {...engagements[i],"employeeName": employeeName};
             }, (error) => {
                console.log(error);
             }); 
            
        }
        //if state isFiltered is true then set filtered engagements array to the new engagements array, else set main engagements array to the new one
        if(isFiltered){
            this.setState({
                filteredEngag: engagements
            });
        } else {
            this.setState({
                engagements: engagements
            });
        }
        
    }

    //handle change of filterby selected option
    handleFilterByChange(option){
        this.setState({
            filterOption: option.value
        });
    }

    //handle change of filter keyword input value
    handleFilterInputChange(evt){
        this.setState({
            filterKeyw: evt.target.value
        });
    }

    //handle filtering event
    handleFilter(){
        let unfilteredEngag = this.state.engagements;
        let filteredEngag = [];
        let filterKeyw = this.state.filterKeyw.toLowerCase();
        let filterBy = this.state.filterOption;

        if(filterKeyw.length>0){
            //if engagement name is selected as filter by option, filter engagements based on engagement name
            if(filterBy === "Engagement Name"){
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.name.toLowerCase().indexOf(filterKeyw) > -1));
            //if client name is selected as filter by option, filter engagements based on client name
            } else if(filterBy === "Client Name"){
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.clientName.toLowerCase().indexOf(filterKeyw) > -1));
            //else assume employee name is selected and filter engagements based on employee name
            } else {
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.employeeName.toLowerCase().indexOf(filterKeyw) > -1));
            }
            
            this.setState({
                filteredEngag: filteredEngag,
                isFiltered: true
            });

        } else {
            //if no keyword is entered, set isFiltered to false
            this.setState({
                isFiltered: false
            });
        }
    }

    //toggle between displaying and hiding new engagement input fields
    toggleAddFields(){
        let isAddingBool = this.state.isAdding;

        this.setState({
            isAdding: !isAddingBool
        });

    }

    //create a new engagement 
    async createEngagement(name, client, employee, description){
        const clients = this.state.clients;
        const employees = this.state.employees;

        //get client based on selected client name
        const clientObj = clients.find(cl => cl.name === client);
        //get employee based on selected employee name
        const employeeObj = employees.find(empl => empl.name === employee);

        //get client and employee ids from above find methods
        const clientID = clientObj.id;
        const employeeID = employeeObj.id;

        //create new engagement
        await axios.post("http://localhost:3000/engagements",{
            "name": name,
            "client": clientID,
            "employee": employeeID,
            "description": description
        })
        .then((response) => {
            alert(`${name} added successfully`);
            this.getEngagements();
        }, (error) => {
            console.log(error);
        });
    }

    //end selected engagement (add end date)
    async endEngagement(id, name){
        await axios.put(`http://localhost:3000/engagements/${id}/end`)
        .then((response) => {
            alert(`${name} ended successfully`);
            this.getEngagements();
                
        }, (error) => {
            console.log(error);
        });
        
    }

    //save edited engagement name and/or description
    async editEngagement(id, newName, newDescr){
        await axios.put(`http://localhost:3000/engagements/${id}`,{name: newName, description: newDescr})
        .then((response) => {
            alert(`${newName} updated successfully`);
            this.getEngagements();
        }, (error) => {
            console.log(error);
        });
        
    }

    //remove selected engagement
    async removeEngagement(id, name){
        await axios.delete(`http://localhost:3000/engagements/${id}`)
        .then((response) => {
            alert(`${name} removed successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEngagements();
    }

    render(){
        //populate filter by options
        const filterDropDownOptions = ['Engagement Name', 'Client Name', 'Employee Name'];
        // const defFilterDropDownOptions = filterDropDownOptions[0]; 

        //change button text and input fields class based on isAdding's value
        const addBtnText = (this.state.isAdding) ? "Cancel New Engagement" : "Start New Engagament";
        const addFieldsClass = (this.state.isAdding) ? "NewEngagement-active" : "NewEngagement";
        
        return(
            <div className="EngagementsList">

                <div className="EngagementsList-filter">
                    <div className="EngagementsList-filterby">
                        <div className="EngagementsList-filterby-label">Filter By:</div>
                        <Dropdown className="EngagementsList-filterby-dropdown" options={filterDropDownOptions} onChange={this.handleFilterByChange} value={this.state.filterOption} placeholder="Select an option" />                    
                    </div>                                     
                    <div className="EngagementsList-filter-keyword">
                        <input type="text" onChange={this.handleFilterInputChange} placeholder="Enter Keyword" value={this.state.filterKeyw}/>
                        <button onClick={this.handleFilter}>Filter</button>
                    </div> 
                    <div className="NewEngagement-btn">
                        <button onClick={this.toggleAddFields}>{addBtnText}</button>
                    </div> 
                </div>

                <NewEngagement createEngagement={this.createEngagement} class={addFieldsClass} clients={this.state.clients} employees={this.state.employees}/> 

                <div className="EngagementsList-header">
                    <div className="EngagementsList-name">Name</div>
                    <div className="EngagementsList-client">Client</div>
                    <div className="EngagementsList-employee">Employee</div>
                    <div className="EngagementsList-started">Start Date</div>
                    <div className="EngagementsList-description">Description</div>
                    <div className="EngagementsList-ended">End Date</div>
                    <div className="EngagementsList-buttons"></div>    
                </div>
                {(this.state.isFiltered) ? (
                    this.state.filteredEngag.map(eng => <Engagement key={eng.id} endEngagement={this.endEngagement} editEngagement={this.editEngagement} removeEngagement={this.removeEngagement} engagem={eng}/>)
                ) : (
                    this.state.engagements.map(eng => <Engagement key={eng.id} endEngagement={this.endEngagement} editEngagement={this.editEngagement} removeEngagement={this.removeEngagement} engagem={eng}/>)
                )}
                
            </div>
        );
    }
}

export default EngagementsList;