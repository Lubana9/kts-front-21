
import repoTile from "@components/repoTile";
import { BrowserRouter,Route, Redirect } from "react-router-dom";
import ReposSearchPage from './pages';

const routes = [
  {
    path: "/repos",
    component: ReposSearchPage
  },
  {
    path: "/repos/:id",
    create: (id: string): string => `/repos/${id}`,
    component: repoTile
  }
]
const App = () => {
  return (

    <BrowserRouter>
 
      {routes.map((route) => (
        <Route path={route.path} component={route.component}>
        </Route>
      ))}
      <Redirect to = "/repos" />
      
    </BrowserRouter>
    
  
  );
}

export default App;
