import './App.css';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomeGuest from "./components/HomeGuest";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Terms from "./pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" exact>
          <HomeGuest/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/terms">
          <Terms/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
