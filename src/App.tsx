import Navbar from './components/Navigation';
import Home from './Home'
import Shop from './Shop'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [open, setOpen] = useState(false);

  return (
    <Router>
      <Navbar open={open} setOpen={setOpen} />
      <Switch>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
