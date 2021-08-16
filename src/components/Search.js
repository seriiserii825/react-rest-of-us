import React, { useCallback, useContext, useEffect } from 'react';
import DispatchContext from "../context/DispatchContext";

function Search() {
  const appDispatch = useContext(DispatchContext);

  function closeSearch() {
    appDispatch({ type: "closeSearch" });
  }

  const closeByEsc = useCallback(e => {
    if (e.code === 'Escape') {
      appDispatch({ type: "closeSearch" });
    }
  }, [appDispatch]);

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => document.addEventListener('keydown', closeByEsc);
  }, [closeByEsc]);

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"/>
          </label>
          <input autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field"
                 placeholder="What are you interested in?"/>
          <span onClick={closeSearch} className="close-live-search">
            <i className="fas fa-times-circle"/>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className="live-search-results live-search-results--visible">
            <div className="list-group shadow-sm">
              <div className="list-group-item active"><strong>Search Results</strong> (3 items found)</div>
              <a href="/" className="list-group-item list-group-item-action">
                <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
                     alt=""/>
                <strong>Example Post #1</strong>
                <span className="text-muted small">by brad on 2/10/2020 </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;