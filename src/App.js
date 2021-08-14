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
import ExampleContext from "./context/ExampleContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));
  const [flashMessage, setFlashMessage] = useState('');
  const value = {
    setLoggedIn,
    setFlashMessage
  }
  return (
    <ExampleContext.Provider value={value}>
      <BrowserRouter>
        <Header loggedIn={loggedIn}/>
        {flashMessage !== '' && <FlashMessage msg={flashMessage}/>}
        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home/> : <HomeGuest/>}
          </Route>
          <Route path="/create-post">
            <CreatePost/>
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
    </ExampleContext.Provider>
  );
}

export default App;
