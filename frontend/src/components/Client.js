import { Component } from "react";
import "./Client.css";

class Client extends Component {
    constructor(props){
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    
    handleEdit(){

    }
    handleRemove(){
        this.props.removeClient(this.props.id);
    }
    render(){
        return(
            <div className="Client">
                <div className="Client-id">{this.props.id}</div>
                <div className="Client-name">{this.props.name}</div>
                <div className="Client-buttons">
                    <button onClick={this.handleEdit}>Edit</button>
                    <button onClick={this.handleRemove}>Remove</button>
                </div>
                
            </div>
        );
    }
}

export default Client;