import { Component } from "react";
import "./Engagement.css";

class Engagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            newName: "",
            startDate: "",
            endDate: ""
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    componentDidMount(){
        let startDate = this.convertDate(this.props.engagem.started);
        let endDate = (this.props.engagem.ended) ? this.convertDate(this.props.engagem.ended) : "Current";
        /* let clientName = this.getClientName(this.props.engagem.client); */

        this.setState({
            newName: this.props.name,
            startDate: startDate,
            endDate: endDate
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

    convertDate(d){
        let convertedDate = new Date(d);
        let dateDay = (convertedDate.getDay().toString().length === 2) ? convertedDate.getDay().toString() : ("0" + convertedDate.getDay().toString());
        let dateMonth = (convertedDate.getMonth().toString().length === 2) ? convertedDate.getMonth().toString() : ("0" + convertedDate.getMonth().toString());
        let dateStr = dateDay + "-" + dateMonth + "-" + convertedDate.getFullYear().toString();

        return dateStr;
    }


    render(){
        return(           
            <div className="Engagement">    
                <div className="Engagement-info">
                    <div className="Engagement-name">
                        {this.state.isEditing ? <input value={this.state.newName} onChange={this.handleNameChange}/> : this.props.engagem.name}
                    </div>

                    <div className="Engagement-client">{this.props.engagem.clientName}</div>
                    <div className="Engagement-employee">{this.props.engagem.employeeName}</div>
                    <div className="Engagement-started">{this.state.startDate}</div>
                    <div className="Engagement-description">{this.props.engagem.description}</div>
                    <div className="Engagement-ended">{this.state.endDate}</div>
                </div>         
                
                {this.state.isEditing ? (
                    <div className="Engagement-buttons">
                        <div className="Engagement-button" onClick={this.handleSave}><i class="fas fa-save"></i></div>
                        <div className="Engagement-button" onClick={this.handleUndo}><i class="fas fa-undo"></i></div>
                    </div>
                ) : (               
                <div className="Engagement-buttons">
                    <div className="Engagement-button" onClick={this.handleEdit}><i class="fas fa-edit"></i></div>
                    <div className="Engagement-button" onClick={this.handleRemove}><i class="fas fa-trash-alt"></i></div>
                </div>
                )}
            </div>
        );
    }
}

export default Engagement;