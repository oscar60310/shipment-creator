import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Creator } from './creator';
import { Setting } from './setting';

import '@blueprintjs/core/lib/css/blueprint.css';
import { Provider } from 'src/context/provider';
import { Nav } from './nav';
import { Customer } from './customer';

const AppComponent = () => {
  return (
    <div>
      <Provider>
        <Nav />
        <div style={{ padding: 10 }}>
          <Router>
            <Switch>
              <Route path="/setting">
                <Setting />
              </Route>
              <Route path="/customer">
                <Customer />
              </Route>
              <Route path="/">
                <Creator />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    </div>
  );
};
export default hot(AppComponent);
