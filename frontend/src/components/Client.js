import { Component } from "react";

class Client extends Component {
    render(){
        return(
            <div>This is a client: {this.props.name}</div>
        );
    }
}

export default Client;