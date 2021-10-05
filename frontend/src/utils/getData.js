import axios from "axios";

function getClients(){
    return axios.get("http://localhost:3000/clients");
}

async function getClient(clientID){
    return await axios.get(`http://localhost:3000/clients/${clientID}`);
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

function getClientEngagements(clientID){
    return axios.get(`http://localhost:3000/clients/${clientID}/engagements`);
}

function getEmployeeEngagements(employeeID){
    return axios.get(`http://localhost:3000/employees/${employeeID}/engagements`);
}

export {getClients, getClient, getEmployees,getEmployee, getEngagements, getClientEngagements, getEmployeeEngagements};