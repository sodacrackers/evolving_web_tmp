import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

const AutocompleteApp = lazy(() => import("./search-autocomplete"));
const SearchApp = lazy(() => import("./search-app"));

// Render the autocomplete form, if the container exists.
const autocompleteContainer = document.getElementById("swiftype-autocomplete");
if (autocompleteContainer) {
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback={<div className="hidden">Loading... </div>}>
        <AutocompleteApp />
      </Suspense>
    </React.StrictMode>,
    autocompleteContainer
  );
}

// Render the search app, if its container exists.
if (window.location.pathname === "/search") {
  const appContainer = document.getElementById("swiftype-container");
  if (appContainer) {
    ReactDOM.render(
      <React.StrictMode>
        <Suspense fallback={<div className="hidden">Loading... </div>}>
          <SearchApp />
        </Suspense>
      </React.StrictMode>,
      appContainer
    );
  }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
// import reportWebVitals from "./components/reportWebVitals";
// reportWebVitals();
