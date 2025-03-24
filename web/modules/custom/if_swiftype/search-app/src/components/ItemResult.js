/* eslint-disable */
import React from "react";
import Categories from "./Categories";
import he from "he";
import moment from "moment-timezone";

/**
 * Template for a search result item.
 */
const ItemResult = (props) => {
  const title = decodeURIComponent(
    props?.data?.title?.raw?.replace(" | City of Bridgeport", "") ?? ""
  ).trim();

  const image = props.data.image?.raw ?? null;

  const type = props.data.type?.raw || "Document";

  const date = props.data.date?.raw ?? null;

  let classes = [
    "horizontal_card",
    "card--search-result",
    `card-${type.replace(/[\W_]+/g, "-").toLowerCase()}`,
    `${image ? "" : " horizontal--no-image"}`,
  ].join(" ");

  const teaser = he.decode(props.data.body.raw.replace(/(<([^>]+)>)/gi, ""));

  // Shorten the teaser.
  let shortTeaser = teaser;
  shortTeaser = shortTeaser.replace(/Skip to main content/gi, "").trim();
  if (shortTeaser.length > 300) {
    shortTeaser = shortTeaser.substring(0, 300);
    // Trim on the last complete word.
    const lastWordCharacterIndex = shortTeaser.search(/\w(?=[^\w]*$)/);
    if (lastWordCharacterIndex > -1) {
      shortTeaser = `${shortTeaser.substring(
        0,
        lastWordCharacterIndex + 1
      )}...`;
    }
  }

  const url = props.data.url?.raw ? new URL(props.data.url?.raw) : null;

  const category =
    props.data.category !== undefined ? (
      <Categories categories={props.data.category.raw} icon="fa-tags" />
    ) : null;

  const department =
    props.data.department !== undefined ? (
      <Categories categories={props.data.department.raw} icon="fa-tags" />
    ) : null;

  const audience =
    props.data.audience !== undefined ? (
      <Categories categories={props.data.audience.raw} icon="fa-family" />
    ) : null;

  const location =
    props.data.location !== undefined ? (
      <Categories categories={props.data.location.raw} icon="fa-family" />
    ) : null;

  let fileBadge = null;
  if (type === "Document") {
    let tags = ["Documents", "Other resources"];
    if (url?.pathname?.includes(".")) {
      const fileExtension = url?.pathname?.split(".").pop().toUpperCase();
      const fileName = url?.pathname?.split("/").pop();
      tags.push(fileName, fileExtension);
    }
    fileBadge = (
      <Categories
        categories={tags.join(", ")}
        icon="fa-file-alt"
      />
    );
  }

  let eventDate = null;
  /***
   * The drupal site has no region. Swiftype sends UTC but they're already
   * in Eastern.
   */
  if (props.data.type?.raw === "Event" && props.data["event-date"]?.raw) {
    let dateStr = props.data["event-date"].raw;
    // Remove 'Z' if present
    if (dateStr.endsWith("Z")) {
      dateStr = dateStr.slice(0, -1);
    }
    // Parse the date string as being in Eastern Time
    const date = moment.tz(dateStr, "America/New_York");

    // Format the date
    eventDate = date.format("MMMM Do, YYYY [at] h:mm a");
  }

  return (
    <div role="article" className={classes}>
      <div class="card flexgrid-nm">
        <h3 className="card__heading h3">
          <a className="heading-link" href={props.data.url.raw}>
            <span>{title}</span>
          </a>
        </h3>

        <div className="card__label">{type}</div>

        <div className="card__content">
          <div className="teaser">{shortTeaser}</div>

          <div className="badges">
            {eventDate && <div className="date">{eventDate}</div>}

            {department}

            {category}

            {audience}

            {location}

            {fileBadge}
          </div>
        </div>
      </div>
      {/* {image && (
          <div className="card__image col-xxl-3 col-l-12">
            <img src={image} alt={title} />
          </div>
        )} */}
    </div>
  );
};

export default ItemResult;
