import { Component } from "react";
import "./Engagement.css";

class Engagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            newName: "",
            newDescr: "",
            startDate: "",
            endDate: "", 
            engagemClass: ""
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescrChange = this.handleDescrChange.bind(this);
    }

    componentDidMount(){     
        //convert date to readible format
        let startDate = this.convertDate(this.props.engagem.started);

        //if enddate exists convert it to readible format, else change it to "Current"
        let endDate = (this.props.engagem.ended) ? this.convertDate(this.props.engagem.ended) : "Current";
        let engagemClass = (endDate === "Current") ? "Engagement current" : "Engagement ended";

        //set new name and description to current name and description
        //set dates to converted dates
        this.setState({
            newName: this.props.engagem.name,
            newDescr: this.props.engagem.description,
            startDate: startDate,
            endDate: endDate,
            engagemClass: engagemClass
        });
        
    }

    componentDidUpdate(prevProps){
        //see if endDate has changed
        if(this.props.engagem.ended !== prevProps.engagem.ended){

            if(this.props.engagem.ended){
                let endDate = this.convertDate(this.props.engagem.ended);

                this.setState({
                    endDate: endDate,
                    engagemClass: "Engagement ended"
                });
            }
            
        }
    }

    //function to convert dates to readible formats
    convertDate(d){
        let convertedDate = new Date(d);
        
        let dateDay = (convertedDate.getDate().toString().length === 2) ? convertedDate.getDate().toString() : ("0" + convertedDate.getDate().toString());
        let dateMonth = ((convertedDate.getMonth()+1).toString().length === 2) ? (convertedDate.getMonth()+1).toString() : ("0" + (convertedDate.getMonth()+1).toString());
        let dateStr = dateDay + "-" + dateMonth + "-" + convertedDate.getFullYear().toString();

        return dateStr;
    }

    //add end date to engagement (from parent component)
    handleEnd(){
        this.props.endEngagement(this.props.engagem.id, this.props.engagem.name);      
    }


    //if editing engagement name, set state isEditing to true
    handleEdit(){
        this.setState({
            isEditing: true
        });
    }

    //handle remove engagement event (from parent component)
    handleRemove(){
        this.props.removeEngagement(this.props.engagem.id, this.props.engagem.name);
    }

    //handle save of edited engagement name and description (from parent component)
    handleSave(){
        this.props.editEngagement(this.props.engagem.id, this.state.newName, this.state.newDescr);
        
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

    //onchange event on input - change new name to edited input value
    handleDescrChange(evt){
        this.setState({
            newDescr: evt.target.value
        });
    }

    render(){

        return(           
            <div className={this.state.engagemClass}>    
                <div className="Engagement-info">
                    <div className="Engagement-name">
                        {this.state.isEditing ? <input value={this.state.newName} onChange={this.handleNameChange}/> : this.props.engagem.name}
                    </div>

                    <div className="Engagement-client">{this.props.engagem.clientName}</div>
                    <div className="Engagement-employee">{this.props.engagem.employeeName}</div>
                    <div className="Engagement-started">{this.state.startDate}</div>

                    <div className="Engagement-description">
                        {this.state.isEditing ? <input value={this.state.newDescr} onChange={this.handleDescrChange}/> : this.props.engagem.description}
                    </div>

                    <div className="Engagement-ended">{this.state.endDate}</div>
                </div>         
                
                {this.state.isEditing ? (
                    <div className="Engagement-buttons">
                        <div className="Engagement-button" onClick={this.handleSave}><i class="fas fa-save"></i></div>
                        <div className="Engagement-button" onClick={this.handleUndo}><i class="fas fa-undo"></i></div>
                    </div>
                ) : (               
                <div className="Engagement-buttons">

                    {(this.state.endDate === "Current") ? (
                        <div title="End Engagement" className="Engagement-button" onClick={this.handleEnd}><i class="fas fa-stop-circle"></i></div>
                    ) : ""}
                    
                    <div title="Edit Engagement" className="Engagement-button" onClick={this.handleEdit}><i class="fas fa-edit"></i></div>
                    <div title="Delete Engagement" className="Engagement-button" onClick={this.handleRemove}><i class="fas fa-trash-alt"></i></div>
                </div>
                )}
            </div>
        );
    }
}

export default Engagement;