import { Component } from "react";
import "./Client.css";

class Client extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            newName: ""
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    componentDidMount(){
        this.setState({
            newName: this.props.name
        });
    }
    handleEdit(){
        this.setState({
            isEditing: true
        });
    }
    handleRemove(){
        this.props.removeClient(this.props.id, this.props.name);
    }
    handleSave(){
        this.props.editClient(this.props.id, this.state.newName);
        this.setState({
            isEditing: false
        });
    }
    handleUndo(){
        this.setState({
            isEditing: false
        });
    }
    handleNameChange(evt){
        this.setState({
            newName: evt.target.value
        });
    }

    render(){
        return(
            <div className="Client">
                <div className="Client-id">{this.props.id}</div>
                <div className="Client-name">
                    {this.state.isEditing ? <input value={this.state.newName} onChange={this.handleNameChange}/> : this.props.name}
                </div>

                {this.state.isEditing ? (
                    <div className="Client-buttons">
                        <div className="Client-button" onClick={this.handleSave}><i class="fas fa-save"></i></div>
                        <div className="Client-button" onClick={this.handleUndo}><i class="fas fa-undo"></i></div>
                    </div>
                ) : (               
                <div className="Client-buttons">
                    <div className="Client-button" onClick={this.handleEdit}><i class="fas fa-edit"></i></div>
                    <div className="Client-button" onClick={this.handleRemove}><i class="fas fa-trash-alt"></i></div>
                </div>
                )}
            </div>
        );
    }
}

export default Client;