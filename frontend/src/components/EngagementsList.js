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

        const searchStr = queryString.parse(this.props.location.search);
        if(searchStr !== ""){
            let filter = searchStr.role + " Name";
            this.setState({
                filterOption: filter,
                filterKeyw: searchStr.name
            });
            if(searchStr.role === "Client"){
                this.getEngagementsByClient(searchStr.id);
            } else if(searchStr.role === "Employee"){
                this.getEngagementsByEmployee(searchStr.id);
            }
            
        } else {
            this.setState({
                filterOption: "Engagement Name",
            });
        }

        
    }

    async getEngagementsByClient(id){
        let engagements = [];
        await getClientEngagements(id)
        .then((response) => {
            engagements = response.data;
            this.setState({
                filteredEngag: engagements,
                isFiltered: true
            });
            this.getNames(engagements, true);
        }, (err) => {
            console.log(err);
        });
        
    }

    async getEngagementsByEmployee(id){
        let engagements = [];
        await getEmployeeEngagements(id)
        .then((response) => {
            engagements = response.data;
            this.setState({
                filteredEngag: engagements,
                isFiltered: true
            });
            this.getNames(engagements, true);
        }, (err) => {
            console.log(err);
        });
        
    }

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

    handleFilterByChange(option){
        this.setState({
            filterOption: option.value
        });
    }

    handleFilterInputChange(evt){
        this.setState({
            filterKeyw: evt.target.value
        });
    }

    handleFilter(){
        let unfilteredEngag = this.state.engagements;
        let filteredEngag = [];
        let filterKeyw = this.state.filterKeyw.toLowerCase();
        let filterBy = this.state.filterOption;

        console.log(filterKeyw);
        console.log(filterBy);

        if(filterKeyw.length>0){
            if(filterBy === "Engagement Name"){
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.name.toLowerCase().indexOf(filterKeyw) > -1));
            } else if(filterBy === "Client Name"){
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.clientName.toLowerCase().indexOf(filterKeyw) > -1));
                console.log(unfilteredEngag);
            } else {
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.employeeName.toLowerCase().indexOf(filterKeyw) > -1));
            }
            
            this.setState({
                filteredEngag: filteredEngag,
                isFiltered: true
            });

            console.log(filteredEngag);

        } else {
            this.setState({
                isFiltered: false
            });
        }
    }

    toggleAddFields(){
        let isAddingBool = this.state.isAdding;

        this.setState({
            isAdding: !isAddingBool
        });

    }

    async createEngagement(name, client, employee, description){
        const clients = this.state.clients;
        const employees = this.state.employees;

        const clientObj = clients.find(cl => cl.name === client);
        const employeeObj = employees.find(empl => empl.name === employee);

        const clientID = clientObj.id;
        const employeeID = employeeObj.id;

        await axios.post("http://localhost:3000/engagements",{
            "name": name,
            "client": clientID,
            "employee": employeeID,
            "description": description
        })
        .then((response) => {
            console.log(response);
            alert(`${name} added successfully`);
            this.getEngagements();
        }, (error) => {
            console.log(error);
        });
    }

    async endEngagement(id, name){
        await axios.put(`http://localhost:3000/engagements/${id}/end`)
        .then((response) => {
            console.log(response);
            alert(`${name} ended successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEngagements();
    }

    async editEngagement(id, newName, newDescr){
        
        await axios.put(`http://localhost:3000/engagements/${id}`,{name: newName, description: newDescr})
        .then((response) => {
            console.log(response);
            alert(`${newName} updated successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEngagements();
    }

    async removeEngagement(id, name){
        await axios.delete(`http://localhost:3000/engagements/${id}`)
        .then((response) => {
            console.log(response);
            alert(`${name} removed successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getEngagements();
    }

    render(){
        const filterDropDownOptions = ['Engagement Name', 'Client Name', 'Employee Name'];
        const defFilterDropDownOptions = filterDropDownOptions[0];

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