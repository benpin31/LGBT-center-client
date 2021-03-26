import './App.css';
import {Switch, Route} from 'react-router-dom';


import Home from './Views/Home';
import Dashboard from './Views/Dashboard';
import NotFound from './Views/NotFound';
import NavDashboard from './Components/GlobalElements/DashboardNavBar'

function App() {
  return (
    <div className="App">
      <div>
        <NavDashboard/>
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* à protéger */}
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
