import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landingpage from '../src/Components/Landingpage/Landingpage';
import Homepage from '../src/Components/Homepage/Homepage';
import Formpage from '../src/Components/Formpage/Formpage';
import Detailpage from '../src/Components/Detailpage/Detailpage';
import Info from '../src/Components/Info/Info';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route path="/home" component={Homepage} />
          <Route path="/form" component={Formpage} />
          <Route path="/dogs/:id" component={Detailpage} />
          <Route path="/info" component={Info} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;