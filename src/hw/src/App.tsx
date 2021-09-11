import repoTile from "@components/repoTile";
import { BrowserRouter,Route, Redirect } from "react-router-dom";
import './App.css';
import ReposSearchPage from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/repos" component={ReposSearchPage} />
      <Route path="/repos/:id" component={repoTile}/>
      <Redirect to = "/repos" />
      
    </BrowserRouter>
    
  
  );
}

export default App;
