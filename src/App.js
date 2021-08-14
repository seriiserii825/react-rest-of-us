import './App.css';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomeGuest from "./components/HomeGuest";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Home from "./components/Home";
import { useState } from "react";
import CreatePost from "./pages/CreatePost";

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home/> : <HomeGuest/>}
        </Route>
        <Route path="/create-post">
          <CreatePost/>
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
