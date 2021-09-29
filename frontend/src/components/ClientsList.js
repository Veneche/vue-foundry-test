import {Component} from 'react';
import Client from './Client';
import axios from 'axios';
import "./ClientList.css";
import {v4 as uuidv4} from "uuid";

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
    }
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

    handleAdd(){
        let newClientName = this.state.newClient;
        if(newClientName !== ""){
            axios.post("http://localhost:3000/clients",{
                "name": this.state.newClient
            })
            .then((response) => {
                console.log(response);
                alert("New client added successfully");
            }, (error) => {
                console.log(error);
            });
            this.getClients();
            this.clearInput();
        } else {
            alert("Please enter a client name");
        }
        
    }

    handleInputChange(evt){
        this.setState({
            newClient: evt.target.value
        });
    }

    async clearInput(){
        await this.setState({
            newClient: ""
        });
    }

    removeClient(id){
        axios.delete(`http://localhost:3000/clients/${id}`);
        alert("Client removed");
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
                
                {this.state.clients.map(client => <Client removeClient={this.removeClient} id={client.id} name={client.name}/>)}
            </div>
        );
    }
}

export default ClientsList;