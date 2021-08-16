import {Component} from 'react';

class Employee extends Component{
    render(){
        return(
            <div>This is an employee: {this.props.name}</div>
        );

    }
}

export default Employee;