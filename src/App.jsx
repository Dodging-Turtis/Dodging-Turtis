import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Main from './Pages/Main';
import Game from './Pages/Game';
import Leaderboard from './Pages/Leaderboard';
import Store from './Pages/Store';
import Personal from './Pages/Personal';
import NftDetails from './Pages/NftDetails';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/play' component={Main} />
          <Route path='/game' component={Game} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/store' component={Store} />
          <Route path='/personal' component={Personal} />
          <Route path='/details/:id' component={NftDetails} />
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
