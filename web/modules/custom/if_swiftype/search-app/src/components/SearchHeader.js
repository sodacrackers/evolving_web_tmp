import React from "react";

/**
 * Search header including the search input for the main search page.
 */
const SearchHeader = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-header flexgrid">
      <div className="col-xxl-3 col-l-12">
        <h1 className="h1">Search</h1>
      </div>
      <div className="search-form flexgrid-nm col-xxl-9 col-l-12">
        <div className="search-form__input">
          <input
            type="text"
            name="query"
            value={searchTerm}
            className="form-item__textfield"
            placeholder="Search web pages, articles, news and more..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <div className="search-form__submit col-xxl-3 col-l-12">
          <input
            type="submit"
            value="Search"
            class="button form-submit"
          ></input>
        </div> */}
      </div>
    </div>
  );
};

export default SearchHeader;
