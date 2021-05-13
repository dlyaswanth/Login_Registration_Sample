import {BrowserRouter,Route,Switch} from 'react-router-dom' 
import './App.css' 
import Login from './components/screens/signin'
import Register from './components/screens/signup'
import Home from './components/screens/home'
function App() 
{
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path="/"><Login /></Route>
    <Route exact path="/signup"><Register/></Route>
    <Route exact path="/home"><Home/></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
