import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import NotFound from "./Views/NotFound";
import NavDashboard from "./Components/GlobalElements/DashboardNavBar";
import SettingsUsers from "./Views/Settings/SettingsUsers";

function App() {
  return (
    <div className="App">
      <div>
        <NavDashboard />
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* à protéger */}
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/users" component={SettingsUsers} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
