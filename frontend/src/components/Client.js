import { Component } from "react";
import { Link } from "react-router-dom";
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
        //if editing client name, set state isEditing to true
        this.setState({
            isEditing: true
        });
    }

    handleRemove(){
        //handle remove client event
        this.props.removeClient(this.props.id, this.props.name);
    }
    handleSave(){
        //handle save of edited client name
        this.props.editClient(this.props.id, this.state.newName);
        //set state isEditing to false after saving
        this.setState({
            isEditing: false
        });
    }
    handleUndo(){
        //set state isEditing back to false
        this.setState({
            isEditing: false
        });
    }
    handleNameChange(evt){
        //onchange event on input - change new name to edited input value
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
                    <div title="Edit Client" className="Client-button" onClick={this.handleEdit}><i class="fas fa-edit"></i></div>
                    <Link title="View Client Engagements" className="Client-button" to={`/engagements?role=Client&name=${this.props.name}&id=${this.props.id}`}><i class="fas fa-eye"></i></Link>
                    <div title="Delete Client" className="Client-button" onClick={this.handleRemove}><i class="fas fa-trash-alt"></i></div>
                </div>
                )}
            </div>
        );
    }
}

export default Client;