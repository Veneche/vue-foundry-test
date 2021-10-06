import {Component} from 'react';
import { Link } from 'react-router-dom';
import "./Employee.css";

class Employee extends Component{
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

    //set newName to current name
    componentDidMount(){
        this.setState({
            newName: this.props.name
        });
    }

    //if editing client name, set state isEditing to true
    handleEdit(){
        this.setState({
            isEditing: true
        });
    }

    //handle remove client event (from parent component)
    handleRemove(){
        this.props.removeEmployee(this.props.id, this.props.name);
    }

    //handle save of edited client name (from parent component)
    handleSave(){  
        this.props.editEmployee(this.props.id, this.state.newName);
        //set state isEditing to false after saving
        this.setState({
            isEditing: false
        });
    }

    //set state isEditing back to false
    handleUndo(){
        this.setState({
            isEditing: false
        });
    }

    //onchange event on input - change new name to edited input value
    handleNameChange(evt){
        this.setState({
            newName: evt.target.value
        });
    }
    
    render(){   
        return(
            <div className="Employee">
                <div className="Employee-id">{this.props.id}</div>
                <div className="Employee-name">
                    {this.state.isEditing ? <input value={this.state.newName} onChange={this.handleNameChange}/> : this.props.name}
                </div>

                {this.state.isEditing ? (
                    <div className="Employee-buttons">
                        <div className="Employee-button" onClick={this.handleSave}><i class="fas fa-save"></i></div>
                        <div className="Employee-button" onClick={this.handleUndo}><i class="fas fa-undo"></i></div>
                    </div>
                ) : (               
                <div className="Employee-buttons">
                    <div title="Edit Employee" className="Employee-button" onClick={this.handleEdit}><i class="fas fa-edit"></i></div>
                    <Link title="View Employee Engagements" className="Client-button" to={`/engagements?role=Employee&name=${this.props.name}&id=${this.props.id}`}><i class="fas fa-eye"></i></Link>
                    <div title="Delete Employee" className="Employee-button" onClick={this.handleRemove}><i class="fas fa-trash-alt"></i></div>
                </div>
                )}
            </div>
        );

    }
}

export default Employee;