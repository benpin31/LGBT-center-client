import './App.css';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from './Views/Home';
import Dashboard from './Views/Dashboard';
import NotFound from './Views/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" protectionLevel="admin" component={Home}/>
        {/* à protéger */}
        <ProtectedRoute exact path="/dashboard" protectionLevel="volunteer" component={Dashboard}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
