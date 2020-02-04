import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Menu } from 'antd';

import Home from './components/page/home';
import Nav from './components/layout/nav';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
