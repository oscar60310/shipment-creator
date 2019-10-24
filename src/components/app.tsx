import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core';
import { Provider } from 'react-redux';
import { Creator } from './creator';
import { Setting } from './setting';

import '@blueprintjs/core/lib/css/blueprint.css';
import store from '../store';

const AppComponent = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>Company Name</NavbarHeading>
              <NavbarDivider />
              <Button
                className={Classes.MINIMAL}
                icon="home"
                text="建立出貨單"
              />
              <Button className={Classes.MINIMAL} icon="cog" text="基本設定" />
            </NavbarGroup>
          </Navbar>
          <Switch>
            <Route path="/setting">
              <Setting />
            </Route>
            <Route path="/">
              <Creator />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};
export default hot(AppComponent);
