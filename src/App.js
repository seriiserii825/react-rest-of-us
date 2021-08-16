import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomeGuest from "./components/HomeGuest";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Home from "./components/Home";
import CreatePost from "./pages/CreatePost";
import ViewSinglePost from "./pages/ViewSinglePost";
import FlashMessage from "./components/FlashMessage";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import { useImmerReducer } from "use-immer";
import React, { useEffect } from "react";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import Search from "./components/Search";
import { CSSTransition } from "react-transition-group";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessage: "",
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername")
    },
    isSearchVisible: false
  };
  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessage = action.value;
        return;
      default:
        return;
      case "openSearch":
        draft.isSearchVisible = true;
        return;
      case "closeSearch":
        draft.isSearchVisible = false;
        return;
    }
  };

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexappToken", state.user.token);
      localStorage.setItem("complexappUsername", state.user.username);
    } else {
      localStorage.removeItem("complexappToken");
      localStorage.removeItem("complexappUsername");
    }
  }, [state.loggedIn, state.user.token, state.user.username]);
  return (<StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      <BrowserRouter>
        <Header/>
        {
          state.flashMessage !== "" && (<FlashMessage msg={state.flashMessage}/>
          )
        }
        <Switch>
          <Route path="/" exact>
            {state.loggedIn ? <Home/> : <HomeGuest/>}
          </Route>
          <Route path="/profile/:username"><Profile/></Route>
          <Route path="/create-post">
            <CreatePost/>
          </Route>
          <Route path="/post/:id" exact><ViewSinglePost/></Route>
          <Route path="/post/:id/edit" exact>
            <EditPost/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route
            path="/terms">
            <Terms/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
        <CSSTransition timeout={2000} in={state.isSearchVisible} classNames="search-overlay" unmountOnExit>
          <Search/>
        </CSSTransition>
        <Footer/>
      </BrowserRouter>
    </DispatchContext.Provider>
  </StateContext.Provider>);
}

export default App;