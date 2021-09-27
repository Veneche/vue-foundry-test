import './App.css';
import EmployeesList from './components/EmployeesList';
import ClientsList from './components/ClientsList';
import EngagementsList from './components/EngagementsList';


function App() {
  return (
    <div className="App">
      <h1>Resource Engagement App</h1>
        <EmployeesList />
        <ClientsList />
        <EngagementsList />
    </div>
  );
}

export default App;
