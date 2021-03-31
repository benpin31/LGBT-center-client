import "./App.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import SettingsUsers from "./Views/Settings/SettingsUsers";
import HeaderFlag from './Components/GlobalElements/HeaderFlag';

import Home from './Views/Home';

import NavDashboard from './Components/GlobalElements/DashboardNavBar';

import History from './Views/Visits/History';
import CreateVisit from './Views/Visits/CreateVisit';
import UpdateVisit from './Views/Visits/UpdateVisit';
import SettingsCatCont from './Views/Settings/SettingsCatCont';
import CategoriesDistribution from './Views/Insights/CategoriesDistribution';
import HotDay from './Views/Insights/HotDay';
import HotTime from './Views/Insights/HotTime';
import RetrieveData from './Views/Insights/RetrieveData'

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
          <ProtectedRoute protectionLevel="volunteer" exact path="/categories-repartition" component={CategoriesDistribution}/>
          <ProtectedRoute protectionLevel="volunteer" exact path="/jour-affluence" component={HotDay}/>
          <ProtectedRoute protectionLevel="volunteer" exact path="/heure-affluence" component={HotTime}/>
          <ProtectedRoute protectionLevel="volunteer" exact path="/csv" component={RetrieveData}/>

          <ProtectedRoute protectionLevel="volunteer" exact path="/new-visit" component={CreateVisit}/>
          <ProtectedRoute protectionLevel="volunteer" exact path="/update-visit" component={UpdateVisit}/>
          <ProtectedRoute protectionLevel="volunteer" exact path="/history" component={History}/>
          
          <ProtectedRoute protectionLevel="admin" exact path="/parameters" component={SettingsCatCont}/>

          <ProtectedRoute protectionLevel="admin" exact path="/users" component={SettingsUsers} />

          <ProtectedRoute protectionLevel="volunteer" path="*" component={NotFound} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
