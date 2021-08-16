import { Component } from "react";

class Engagement extends Component{
    render(){
        return(
            <div>
                <div>Name: {this.props.engagem.name}</div>
                <div>Client: {this.props.engagem.client}</div>
                <div>Employee: {this.props.engagem.employee}</div>
                <div>Started: {this.props.engagem.started}</div>
                <div>Description: {this.props.engagem.description}</div>
            </div>
        );
    }
}

export default Engagement;