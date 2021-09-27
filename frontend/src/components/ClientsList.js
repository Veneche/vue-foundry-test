import {Component} from 'react';
import Client from './Client';
import axios from 'axios';

class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: []
        };
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
    render(){
        return(
            <div>
                {this.state.clients.map(client => <Client name={client.name}/>)}
            </div>
        );
    }
}

export default ClientsList;