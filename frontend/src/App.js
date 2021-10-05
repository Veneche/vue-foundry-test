import './App.css';
import EmployeesList from './components/EmployeesList';
import ClientsList from './components/ClientsList';
import EngagementsList from './components/EngagementsList';
import {Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">      
      <h1>Resource Engagement</h1>
      <div className="App-container">
        <Navbar/>
        <div className="App-list">
          <Switch>
            <Route exact path="/employees" component={EmployeesList}/>
            <Route exact path="/clients" component={ClientsList}/>
{/*             <Route exact path="/clients/:id/engagements" render={(props) => <EngagementsList clientID={props.match.params.id}/>}/> */}
            <Route exact path="/engagements" component={EngagementsList}/>
          </Switch>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
