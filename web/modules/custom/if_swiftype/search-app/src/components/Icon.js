import React from "react";

/**
 * Fontawesome icon.
 *
 * @param icon
 *   Fontawesome icon indicator.
 * @param iconStyle
 *   Fontawesome icon style.
 * @param props
 *   Additional props.
 *
 * @returns {JSX.Element}
 *   Icon component.
 */
const Icon = ({ icon, iconStyle, ...props }) => {
  const classes = iconStyle + " " + icon;

  return(
    <span className="icon" {...props}>
      <i className={classes}/>
    </span>
  )
}

export default Icon;
