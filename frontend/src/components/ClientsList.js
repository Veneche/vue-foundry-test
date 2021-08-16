import {Component} from 'react';
import Client from './Client';

class ClientsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [
                {id: "c46f2c5f-2531-434b-8ba4-4ef5599ee650", name: "ACME"},
                {id: "3b4b2166-08ef-4c77-899b-faffa70d9b24", name: "BOCO"},
                {id: "e7c17a7c-487c-47c2-8e6c-0eecee7b4606", name: "CASE"}
            ]
        };
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