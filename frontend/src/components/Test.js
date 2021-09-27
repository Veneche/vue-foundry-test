import React, { Component } from "react";
import axios from "axios";

class Test extends Component  {
    constructor(props){
        super(props);
        this.state = {
            clients: []
        };
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
    componentDidMount(){
        this.getClients();
    }
    
    render(){
        return(
            <div>
                <h1>Clients</h1>
                <div>
                    {this.state.clients.map(client => <div>{client.name}</div>)} 
                </div>
            </div>
        );
    }
    

}

export default Test;