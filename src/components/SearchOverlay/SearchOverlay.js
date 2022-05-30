import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useImmer } from "use-immer";
import DispatchContext from "../Context/DispatchContext";

const SearchOverlay = () => {
  const appDispatch = useContext(DispatchContext);

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "Neither",
    requestCount: 0,
  });

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler);
    return () => document.removeEventListener("keyup", searchKeyPressHandler);
  }, []);

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState((draft) => {
        draft.show = "loading";
      });
      const delay = setTimeout(() => {
        console.log(state.searchTerm);
        setState((draft) => {
          draft.requestCount++;
        });
      }, 500);

      return () => {
        clearTimeout(delay);
      };
    } else {
      setState((draft) => {
        draft.show = "neither";
      });
    }
  }, [state.searchTerm]);

  useEffect(() => {
    if (state.requestCount) {
      //send axios req here
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const responce = await Axios.post(
            "/search",
            { searchTerm: state.searchTerm },
            { CancelToken: ourRequest.token }
          );
          setState((draft) => {
            draft.results = responce.data;
            draft.show = "results";
          });
        } catch (error) {
          console.log("request was cancel");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.requestCount]);

  const searchKeyPressHandler = (e) => {
    if (e.keyCode == 27) {
      appDispatch({ type: "closeSearch" });
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setState((draft) => {
      draft.searchTerm = value;
    });
  };
  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input
            autoFocus
            type="text"
            autoComplete="off"
            id="live-search-field"
            className="live-search-field"
            placeholder="What are you interested in?"
            onChange={handleInput}
          />
          <span
            onClick={() => appDispatch({ type: "closeSearch" })}
            className="close-live-search"
          >
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div
            className={
              "circle-loader " +
              (state.show == "loading" ? "circle-loader--visible" : "")
            }
          ></div>
          <div
            className={
              "live-search-results" +
              (state.show == "results" ? " live-search-results--visible" : "")
            }
          >
            {Boolean(state.results.length) && (
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> ( {state.results.length}{" "}
                  {state.results.length > 1 ? "items" : "item"} found)
                </div>
                {state.results.map((post) => {
                  const date = new Date(post.createdDate);
                  const formattedDate = `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                  return (
                    <Link
                      onClick={() => appDispatch({ type: "closeSearch" })}
                      key={post._id}
                      to={`/post/${post._id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <img
                        className="avatar-tiny"
                        src={post.author.avatar}
                        height="50px"
                      />
                      <strong>{post.title}</strong>{" "}
                      <span className="text-muted small">
                        {" "}
                        by {post.author.username}on {formattedDate}{" "}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
            {!Boolean(state.results.length) && (
              <p className="alert alert-danger text-center shadow-sm">
                Sorry we couldn't find anything
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
