import {Component} from 'react';
import Client from './Client';
import axios from 'axios';
import "./ClientList.css";

class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            newClient: ""
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.removeClient = this.removeClient.bind(this);
        this.editClient = this.editClient.bind(this);
    }
    //get list of clients
    componentDidMount(){
        this.getClients();
    }
    async getClients(){
        let clients = [];
        let res = await axios.get("http://localhost:3000/clients");

        for(let i = 0; i < res.data.length; i++){
            clients.push(res.data[i]);
        }
        
        this.setState({
            clients: clients
        });
    }
    //Add new client to db and refresh client list
    handleAdd(){
        let newClientName = this.state.newClient;
        if(newClientName !== ""){
            axios.post("http://localhost:3000/clients",{
                "name": this.state.newClient
            })
            .then((response) => {
                console.log(response);
                alert(`${newClientName} added successfully`);
            }, (error) => {
                console.log(error);
            });
            this.getClients();
            this.clearInput();
        } else {
            //if input is blank, display error to user
            alert("Please enter a client name");
        }
        
    }

    //set state to changed input value
    handleInputChange(evt){
        this.setState({
            newClient: evt.target.value
        });
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
            console.log(response);
            alert(`${name} removed successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getClients();
        
    }

    //update client name based on input value
    async editClient(id, newName){
        await axios.put(`http://localhost:3000/clients/${id}`,{name: newName})
        .then((response) => {
            console.log(response);
            alert(`${newName} updated successfully`);
        }, (error) => {
            console.log(error);
        });
        this.getClients();
    }

    render(){
        return(
            <div className="ClientList">
                <div className="ClientList-add">
                    <label>
                        <span className="ClientList-label">Add New Client:</span>
                        <input type="text" onChange={this.handleInputChange} placeholder="Client Name" value={this.state.newClient}/>
                        <button onClick={this.handleAdd}>Add</button>
                    </label>
                      
                </div>
                <div className="ClientList-header">
                    <div className="ClientList-id">Client ID</div>
                    <div className="ClientList-name">Client Name</div>
                </div>
                
                {this.state.clients.map(client => <Client editClient={this.editClient} removeClient={this.removeClient} id={client.id} name={client.name}/>)}
            </div>
        );
    }
}

export default ClientsList;