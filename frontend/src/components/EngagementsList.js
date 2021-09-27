import { Component } from "react";
import Engagement from "./Engagement";
import axios from "axios";

class EngagementsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            engagements: []
        };
    }
    componentDidMount(){
        this.getEngagements();
    }
    async getEngagements(){
        let engagements = [];
        let res = await axios.get("http://localhost:3000/engagements");

        for(let i = 0; i < res.data.length; i++){
            engagements.push(res.data[i]);
        }
        
        this.setState({
            engagements: engagements
        });
    }
    render(){
        return(
            <div>
                {this.state.engagements.map(eng => <Engagement engagem={eng}/>)}
            </div>
        );
    }
}

export default EngagementsList;