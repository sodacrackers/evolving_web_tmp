import React from "react";
import { Paging } from "@elastic/react-search-ui";

import ItemResult from "./ItemResult";

/**
 * Displays search results within app.
 */
const SearchResults = ({ results }) => {
  return (
    <>
      {results.map((r) => (
        <ItemResult key={r.id.raw} data={r} />
      ))}
      <Paging className={"pager__items"} />
    </>
  );
};

export default SearchResults;
