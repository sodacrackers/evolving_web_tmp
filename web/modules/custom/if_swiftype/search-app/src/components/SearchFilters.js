import React, { useEffect, useState } from "react";
import { Facet } from "@elastic/react-search-ui";
import { MultiCheckboxFacet } from "@elastic/react-search-ui-views";
import Icon from "./Icon";

export default function SearchFilters(props) {
  const [showFilter, setShowFilter] = React.useState(window.innerWidth >= 1000);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const checkWindowSize = () => {
    // Remove any "hidden" class, because the toggle icon may be hidden by CSS.
    if (window.innerWidth >= 1000) {
      setShowFilter(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  const deselectAll = () => {
    props.removeFilter("type");
    props.removeFilter("category");
  };

  return (
    <div className="filters">
      <h3 className="h3 filters__title">
        Filter Results
        <Icon
          key={showFilter ? "up" : "down"}
          icon={`${showFilter ? "fa-chevron-up" : "fa-chevron-down"}`}
          iconStyle="fa-sharp fa-regular"
          onClick={() => toggleFilter()}
        />
      </h3>

      <div className={`filters__facets ${showFilter ? "shown" : "hidden"}`}>
        <div className="facets">
          <Facet
            field="type"
            label="By Type"
            isFilterable={false}
            view={MultiCheckboxFacet}
          />
          <Facet
            field="category"
            label="By Category"
            searchPlaceholder="- Any -"
            filterType="all"
            isFilterable={false}
            show="10"
            view={MultiCheckboxFacet}
          />
          <Facet
            field="department"
            label="By Department"
            showMore={false}
            isFilterable={false}
            view={MultiCheckboxFacet}
          />
          <button
            className="filter-action-button"
            onClick={deselectAll}
            style={{ display: props.filters.length ? "block" : "none" }}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
