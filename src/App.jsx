import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import SettingsUsers from "./Views/Settings/SettingsUsers";
import HeaderFlag from './Components/GlobalElements/HeaderFlag';

import Home from './Views/Home';

import Dashboard from './Views/Dashboard';
import NavDashboard from './Components/GlobalElements/DashboardNavBar';
import History from './Views/Visits/History';
import CreateVisit from './Views/Visits/CreateVisit';
import SettingsCatCont from './Views/Settings/SettingsCatCont'

import NotFound from './Views/NotFound';

function App() {
  return (
    <div className="App">

      <HeaderFlag/>

      <div id="left-side">
        <NavDashboard/>
      </div>

      <div id="right-side">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* à protéger */}
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/users" component={SettingsUsers} />
          <Route exact path="/dashboard/history" component={History}/>
          <Route exact path="/dashboard/new-visit" component={CreateVisit}/>
          <Route 
            exact 
            path="/dashboard/parametres" 
            component={SettingsCatCont}>
          </Route>
          <Route path="*" component={NotFound} />

        </Switch>
      </div>

    </div>
  );
}

export default App;
