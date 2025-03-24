import React, { useState } from "react";
import { SearchBox } from "@elastic/react-search-ui";

const SearchInput = (props) => {

  const [searchDomain, setSearchDomain] = useState("website");

  function getSearchResults(e) {
    if (searchDomain === "catalog") {
      let url = "https://example.com/?keyword=";
      window.open(url + props.searchTerm, "_blank");
    } else {
      window.location = "/search?q=" + props.searchTerm;
    }
  }

  return (
    <SearchBox
      inputView={({ getAutocomplete, getInputProps, getButtonProps }) => (
        <>
          <label for="search-domain">Search</label>
          <div class="select">
            <select
              name="search-domain"
              id="search-domain"
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
            >
              <option value="website">Website</option>
              <option value="catalog">Catalog</option>
            </select>
          </div>
          <div class="input-wrapper">
            <input
              autoFocus="autoFocus"
              {...getInputProps({})}
              placeholder={
                searchDomain === "website"
                  ? "Search website pages, news and events..."
                  : "Search catalog titles and more..."
              }
            />
            {(searchDomain === "website") &&
              getAutocomplete()
            }

            <div class="search-form-submit">
              <button
                type="submit"
                id="edit-submit-search"
                value=""
                aria-label="submit"
                class="button"
                {...getButtonProps({
                })}
                onClick={getSearchResults}
              >
                <i class="far fa-search"></i>
              </button>
            </div>
          </div>
        </>
      )}
      autocompleteResults={{
        titleField: "title",
        urlField: "url",
      }}
      autocompleteSuggestions={true}
      onSubmit={(t) => {
        getSearchResults(t);
      }}
    />
  );
};

export default SearchInput;
