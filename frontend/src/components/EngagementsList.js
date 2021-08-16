import { Component } from "react";
import Engagement from "./Engagement";

class EngagementsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            engagements: [
                {
                    id: "7e1bba58-8cea-4b92-a4ea-3821ccb5d3d9",
                    name: "DOING STUFF",
                    client: "c46f2c5f-2531-434b-8ba4-4ef5599ee650",
                    employee: "ec017813-ad03-494f-8ab5-affb9194f43b",
                    started: "2021-08-16T05:16:24.793Z",
                    description: ""
                }
            ]
        };
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