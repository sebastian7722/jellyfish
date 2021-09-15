import Navbar from './components/Navigation';
import Home from './Home';
import Shop from './Shop';
import Forum from './Forum';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from './lib/firebaseContext';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/forum">
          <AuthProvider>
            <Forum />
          </AuthProvider>
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
