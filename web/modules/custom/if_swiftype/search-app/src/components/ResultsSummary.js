import React from "react";
import { PagingInfo } from "@elastic/react-search-ui";

/**
 * Displays how many results are shown out of total results using PagingInfo.
 */
const ResultsSummary = (props) => {
  return (
    <PagingInfo
      view={({ searchTerm, totalResults, start, end }) => (
        <div className="summary">
          Displaying {start} to {end} of {totalResults} results for
          "<em>{searchTerm}</em>"
        </div>
      )}
    />
  );
};

export default ResultsSummary;
