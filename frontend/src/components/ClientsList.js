import {Component} from 'react';
import Client from './Client';
import axios from 'axios';
import "./ClientList.css";
import {getClients} from "../utils/getData";
import FilterClientEmployee from './FilterClientEmployee';

class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            filteredClients: [],
            isFiltered: false
        };
        this.addNewClient = this.addNewClient.bind(this);
        this.filterByClient = this.filterByClient.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.removeClient = this.removeClient.bind(this);
        this.editClient = this.editClient.bind(this);
    }
    //get list of clients
    componentDidMount(){
        this.getClients();
    }

    //get list of clients
    async getClients(){
        let clients = [];

        await getClients()
        .then((res) => {
            for(let i = 0; i < res.data.length; i++){
                clients.push(res.data[i]);
            }

            this.setState({
                clients: clients
            });
        }, (err) =>{
            console.log(err);
        });      
        
    }


    //Add new client to db and refresh client list
    async addNewClient(newClientName){

        await axios.post("http://localhost:3000/clients",{
            "name": newClientName
        })
        .then((response) => {
            console.log(response);
            alert(`${newClientName} added successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getClients();
        this.clearInput();
        
    }
    
    //handle filter by client name
    filterByClient(filterKeyw){
        let unfilteredClients = this.state.clients;

        //if anything is entered in the filter keyword input
        if(filterKeyw.length>0){
            //populate new array with clients that have names that contain the entered keyword
            let filteredClients = unfilteredClients.filter(client => (client.name.toLowerCase().indexOf(filterKeyw) > -1));

            this.setState({
                filteredClients: filteredClients,
                isFiltered: true
            });

        } else {
            //if no keyword is entered, change isFiltered to false
            this.setState({
                isFiltered: false
            });
        }
       
    }


    //clear newClient state and input
    async clearInput(){
        await this.setState({
            newClient: ""
        });
    }

    //delete selected client from db
    //display success message
    async removeClient(id, name){
        await axios.delete(`http://localhost:3000/clients/${id}`)
        .then((response) => {
            alert(`${name} removed successfully`);
        }, (error) => {
            console.log(error);
        });
        //get updated clients list
        this.getClients();  
    }

    //update client name based on input value
    async editClient(id, newName){
        await axios.put(`http://localhost:3000/clients/${id}`,{name: newName})
        .then((response) => {
            alert(`${newName} updated successfully`);
        }, (error) => {
            console.log(error);
        });
        //get updated clients list
        this.getClients();
    }


    render(){
        return(
            <div className="ClientList">
                <FilterClientEmployee role="Client" filterByClient={this.filterByClient} addNewClient={this.addNewClient} />
                
                <div className="ClientList-header">
                    <div className="ClientList-id">Client ID</div>
                    <div className="ClientList-name">Client Name</div>
                </div>
                {(this.state.isFiltered) ? (
                    this.state.filteredClients.map(client => <Client key={client.id} editClient={this.editClient} removeClient={this.removeClient} id={client.id} name={client.name}/>)
                ) : (
                    this.state.clients.map(client => <Client key={client.id} editClient={this.editClient} removeClient={this.removeClient} id={client.id} name={client.name}/>)
                )}
                
            </div>
        );
    }
}

export default ClientsList;