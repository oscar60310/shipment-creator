import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Creator } from './creator';
import { Setting } from './setting';

import { Provider } from 'src/context/provider';
import { Nav } from './nav';
import { Customer } from './customer';
import { ItemManager } from './item';

const LoadResource = (props: { children: any }) => {
  const [finish, setFinish] = React.useState(false);
  React.useEffect(() => {
    const jobs = [
      import('@blueprintjs/core/lib/css/blueprint.css'),
      import('@blueprintjs/datetime/lib/css/blueprint-datetime.css')
    ];
    Promise.all(jobs).then(() => setFinish(true));
  }, []);
  return finish ? (
    props.children
  ) : (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      Loading ...
    </div>
  );
};
const AppComponent = () => {
  return (
    <div>
      <LoadResource>
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
                <Route path="/item">
                  <ItemManager />
                </Route>
                <Route path="/">
                  <Creator />
                </Route>
              </Switch>
            </Router>
          </div>
        </Provider>
      </LoadResource>
    </div>
  );
};
export default hot(AppComponent);
