import { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Engagement from "./Engagement";
import axios from "axios";
import "./EngagementsList.css";


class EngagementsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            engagements: [],
            filteredEngag: [],
            filterOption: "",
            filterKeyw: "",
            isFiltered: false
        };
        this.getNames = this.getNames.bind(this);
        this.getEngagements = this.getEngagements.bind(this);
        this.handleFilterByChange = this.handleFilterByChange.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount(){
        this.getEngagements();
        this.setState({
            filterOption: "Engagement Name"
        });
    }
    async getEngagements(){
        let engagements = [];
        await axios.get("http://localhost:3000/engagements")
        .then((response) => {
            console.log("then"+response.data[0].name);
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
            this.getNames(engagements);

        }, (error) => {
            console.log(error);
        });
    }

    async getNames(engagements){
        let clientID = "";
        let employeeID = "";
        let clientName = "";
        let employeeName = "";

        for(let i = 0; i < engagements.length; i++){
            clientID =  engagements[i].client;
            employeeID =  engagements[i].employee;

             await axios.get(`http://localhost:3000/clients/${clientID}`)
             .then((response) => {
                clientName = response.data.name;             
                engagements[i] = {...engagements[i],"clientName": clientName};
             }, (error) => {
                console.log(error);
             }); 

             await axios.get(`http://localhost:3000/employees/${employeeID}`)
             .then((response) => {
                employeeName = response.data.name;             
                engagements[i] = {...engagements[i],"employeeName": employeeName};
             }, (error) => {
                console.log(error);
             }); 
            
        }

        this.setState({
            engagements: engagements
        });
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

        if(filterKeyw.length>0){
            if(filterBy === "Engagement Name"){
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.name.toLowerCase().indexOf(filterKeyw) > -1));
            } else if(filterBy === "Client Name"){
                filteredEngag = unfilteredEngag.filter(engagem => (engagem.clientName.toLowerCase().indexOf(filterKeyw) > -1));
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

    render(){
        const dropdownOptions = ['Engagement Name', 'Client Name', 'Employee Name'];
        const defaultDropdownOption = dropdownOptions[0];
        return(
            <div className="EngagementsList">
                <div className="EngagementsList-filter">
                    <div className="EngagementsList-filterby">
                        <div className="EngagementsList-filterby-label">Filter By:</div>
                        <Dropdown className="EngagementsList-filterby-dropdown" options={dropdownOptions} onChange={this.handleFilterByChange} value={defaultDropdownOption} placeholder="Select an option" />                    
                    </div>                                     
                    <div className="EngagementsList-filter-keyword">
                        <input type="text" onChange={this.handleFilterInputChange} placeholder="Enter Keyword" value={this.state.filterKeyw}/>
                        <button onClick={this.handleFilter}>Filter</button>
                    </div>  
                </div>
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
                    this.state.filteredEngag.map(eng => <Engagement engagem={eng}/>)
                ) : (
                    this.state.engagements.map(eng => <Engagement engagem={eng}/>)
                )}
                
            </div>
        );
    }
}

export default EngagementsList;