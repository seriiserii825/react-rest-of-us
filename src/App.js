import './App.css';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomeGuest from "./components/HomeGuest";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Home from "./components/Home";
import { useReducer } from "react";
import CreatePost from "./pages/CreatePost";
import ViewSinglePost from "./pages/ViewSinglePost";
import FlashMessage from "./components/FlashMessage";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('complexappToken')),
    flashMessage: ''
  }
  const ourReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessage: state.flashMessage };
      case "logout":
        return { loggedIn: false, flashMessage: state.flashMessage };
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessage: action.value };
      default:
        return;
    }
  }
  const [state, dispatch] = useReducer(ourReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header/>
          {state.flashMessage !== '' && <FlashMessage msg={state.flashMessage}/>}
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home/> : <HomeGuest/>}
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
