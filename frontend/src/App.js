import logo from './logo.svg';
import './App.css';
import EmployeesList from './components/EmployeesList';
import ClientsList from './components/ClientsList';

function App() {
  return (
    <div className="App">
      <h1>Testing</h1>
      <EmployeesList />
      <ClientsList />
    </div>
  );
}

export default App;
