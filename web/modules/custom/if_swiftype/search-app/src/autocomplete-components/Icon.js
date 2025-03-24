import React from "react";

/**
 * Fontawesome icon.
 *
 * @param icon
 *   Fontawesome icon indcator.
 * @param iconStyle
 *   Fontawesome icon style.
 *
 * @returns {JSX.Element}
 *   Icon component.
 */
const Icon = ({ icon, iconStyle }) => {
  const classes = iconStyle + " " + icon;

  return(
    <span className="icon">
      <i className={classes}/>
    </span>
  )
}

export default Icon;
