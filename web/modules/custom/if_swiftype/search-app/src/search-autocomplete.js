import { React, useRef } from "react";
import {
  SearchProvider,
  WithSearch
} from "@elastic/react-search-ui";

import Connector from "./components/Connector";
import SearchInput from "./autocomplete-components/SearchInput";
import './search-autocomplete.css';

/**
 * The search box application with react-search-ui.
 */
export default function App() {

  const searchBoxRef = useRef(null);

  /**
   * Config options for the SearchProvider component from react-search-ui.
   *
   * @type {{apiConnector: SiteSearchAPIConnector, autocompleteQuery: {results: {result_fields: {title: {snippet: {size: number, fallback: boolean}}, url: {raw: {}}}}}}}
   */
  const config = {
    apiConnector: Connector,
    autocompleteQuery: {
      // Customize the query for autocompleteResults
      results: {
        result_fields: {
          // Add snippet highlighting
          title: { snippet: { size: 100, fallback: true } },
          url: { raw: {} }
        }
      }
    }
  }




  return (
    <SearchProvider config={config} children={false}>
      <WithSearch
        mapContextToProps={({ searchTerm, setSearchTerm, autocompletedResults, getAutocomplete, getInputProps, getButtonProps }) => ({
          searchTerm,
          setSearchTerm,
          autocompletedResults,
          getAutocomplete,
          getInputProps,
          getButtonProps
        })}
      >
        {({ searchTerm }) => {
          return (
            <div ref={searchBoxRef} class="search-box primary-search">
              <SearchInput
                searchTerm={searchTerm} />
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
