import './App.css';
import {Switch, Route} from 'react-router-dom';


import Home from './Views/Home';
import Dashboard from './Views/Dashboard';
import NotFound from './Views/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* à protéger */}
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
