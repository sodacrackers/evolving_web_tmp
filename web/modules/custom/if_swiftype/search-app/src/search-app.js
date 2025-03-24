import React from "react";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

import Connector from "./components/Connector";
import SearchHeader from "./components/SearchHeader";
import SearchFilters from "./components/SearchFilters";
import SearchResults from "./components/SearchResults";
import ResultsSummary from "./components/ResultsSummary";
import "./search-app.css";

/**
 * The search application with react-search-ui.
 *
 * App must contain <SearchProvider> with config and <withSearch> with mappings
 * of the prop variables.
 *
 * @returns {JSX.Element}
 *   Search applicaton.
 *
 * @see https://docs.elastic.co/search-ui/overview
 * @see https://github.com/elastic/search-ui/tree/1.8/packages/search-ui-site-search-connector
 * @see https://codesandbox.io/s/search-ui-examples-znx8pe?file=/src/pages/site-search/index.js
 */
export default function App() {
  /**
   * Config options for the SearchProvider component from react-search-ui.
   *
   * @type {{initialState: {resultsPerPage: number}, searchQuery: {facets: {type: {type: string}}}, apiConnector: SiteSearchAPIConnector}}
   */
  const config = {
    apiConnector: Connector,
    initialState: {
      resultsPerPage: 8,
    },
    searchQuery: {
      facets: {
        category: { type: "value" },
        department: { type: "value" },
        type: { type: "value" },
      },
    },
  };

  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({
          filters,
          searchTerm,
          setSearchTerm,
          results,
          setFilter,
          clearFilters,
          removeFilter,
          facets,
        }) => ({
          searchTerm,
          filters,
          setSearchTerm,
          results,
          clearFilters,
          removeFilter,
          facets,
          setFilter,
        })}
      >
        {({
          filters,
          searchTerm,
          setSearchTerm,
          results,
          clearFilters,
          removeFilter,
          facets,
          setFilter,
        }) => {
          return (
            <div className="search-container">
              <div className="search-container__header">
                <SearchHeader
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
              <div className="search-container__body flexgrid-nm">
                <div className="search-sidebar col-xxl-4 col-l-12">
                  {results.length > 0 && (
                    <SearchFilters
                      filters={filters}
                      facets={facets}
                      removeFilter={removeFilter}
                      setFilter={setFilter}
                    />
                  )}
                </div>
                <div className="search-results col-xxl-8 col-l-12">
                  <div className="search-summary">
                    <ResultsSummary />
                  </div>
                  <SearchResults results={results} />
                </div>
              </div>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
