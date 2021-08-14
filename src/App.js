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
import ViewSinglePost from "./pages/ViewSinglePost";
import FlashMessage from "./components/FlashMessage";

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));
  const [flashMessage, setFlashMessage] = useState('');
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      {flashMessage !== '' && <FlashMessage msg={flashMessage}/>}
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home/> : <HomeGuest/>}
        </Route>
        <Route path="/create-post">
          <CreatePost setFlasMessage={setFlashMessage}/>
        </Route>
        <Route path="/post/:id">
          <ViewSinglePost/>
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
