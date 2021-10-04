import axios from "axios";

function getClients(){
    return axios.get("http://localhost:3000/clients");
}

function getClient(clientID){
    return axios.get(`http://localhost:3000/clients/${clientID}`);
}

function getEmployees(){
    return axios.get("http://localhost:3000/employees");
}

function getEmployee(employeeID){
    return axios.get(`http://localhost:3000/employees/${employeeID}`);
}

function getEngagements(){
    return axios.get("http://localhost:3000/engagements");
}


export {getClients, getClient, getEmployees,getEmployee, getEngagements};