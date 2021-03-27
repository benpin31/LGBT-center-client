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
import UpdateVisit from './Views/Visits/UpdateVisit';
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
          <ProtectedRoute protectionLevel="volunteer" Route exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute protectionLevel="volunteer" Route exact path="/dashboard/new-visit" component={CreateVisit}/>
          <ProtectedRoute protectionLevel="volunteer" exact path="/dashboard/update-visit" component={UpdateVisit}/>
          <ProtectedRoute protectionLevel="volunteer" Route exact path="/dashboard/history" component={History}/>
          <ProtectedRoute protectionLevel="admin" exact path="/dashboard/parameters" component={SettingsCatCont}/>
          <ProtectedRoute protectionLevel="admin" exact path="/dashboard/users" component={SettingsUsers} />
          <ProtectedRoute protectionLevel="volunteer" path="*" component={NotFound} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
