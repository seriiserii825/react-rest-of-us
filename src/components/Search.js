import React, { useCallback, useContext, useEffect } from 'react';
import DispatchContext from "../context/DispatchContext";
import { useImmer } from "use-immer";
import axios from "axios";
import { API_AXIOS_URL } from "../config";
import FormatDate from "../utils/FormatDate";
import { Link } from "react-router-dom";

function Search() {
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    termSearch: '',
    searchCount: 0,
    searchData: [],
    searchText: '',
    startTyping: false,
    emptyInput: true
  });

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

  function inputHandler(e) {
    const value = e.target.value;
    if (value.length) {
      setState(draft => {
        draft.termSearch = value
        draft.startTyping = true
        draft.emptyInput = false
      })
    } else {
      setState(draft => {
        draft.termSearch = value
        draft.startTyping = true
        draft.emptyInput = true
      })
    }
  }

  useEffect(() => {
    if (state.emptyInput) {
      setState((draft) => {
        draft.searchData = [];
      })
    }
  }, [state.emptyInput]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setState(draft => {
        draft.searchCount++
      })
    }, 300)

    return () => clearTimeout(delay);
  }, [state.termSearch])

  useEffect(() => {
    if (state.searchCount) {
      const ourRequest = axios.CancelToken.source();

      async function fetchRequest() {
        try {
          const response = await axios.post(`${API_AXIOS_URL}/search`, {
            searchTerm: state.termSearch
          }, { cancelToken: ourRequest.token });
          if (response.data.length > 0) {
            setState(draft => {
              draft.searchData = response.data;
            })
          } else {
            setState(draft => {
              draft.searchText = 'Nothing not found';
            })
          }
        } catch (e) {
          console.log(e, 'e')
        }
      }

      fetchRequest();

      return () => ourRequest.cancel();
    }
  }, [state.searchCount]);

  function itemClickHandler() {
    setState(draft => {
      draft.searchData = []
      draft.termSearch = ''
      draft.startTyping = false
    })
    closeSearch();
  }

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"/>
          </label>
          <input autoFocus onChange={inputHandler} type="text" autoComplete="off" id="live-search-field"
                 value={state.termSearch}
                 className="live-search-field"
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
              {(!state.emptyInput && state.searchData.length) ? (
                <div className="list-group-item active"><strong>Search Results</strong> ({state.searchData.length} items
                  found)
                </div>
              ) : null}
              {state.searchData.length ? state.searchData.map(item => (
                <Link key={item._id} to={`/post/${item._id}`} onClick={itemClickHandler}
                      className="list-group-item list-group-item-action">
                  <img className="avatar-tiny" src={item.author.avatar} alt=""/>
                  <strong>{item.title} </strong>
                  <span
                    className="text-muted small">by <strong>{item.author.username}</strong> on {FormatDate(item.createdDate)} </span>
                </Link>
              )) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;