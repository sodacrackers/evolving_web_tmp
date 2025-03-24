import React from "react";
import Icon from "./Icon";
import parse from "html-react-parser";

const Categories = ({ categories, icon }) => {
  let categoryMarkup = "";

  if (Array.isArray(categories)) {
    categoryMarkup = categories
      .map((category, index) => `<span>${category}${index < categories.length - 1 ? ',' : ''}</span>`)
      .join('');
  } else {
    categoryMarkup = `<span>${categories}</span>`;
  }

  return (
    <div className="badge">
      <Icon icon={icon} iconStyle="fa-regular" />
      {parse(categoryMarkup)}
    </div>
  );
};

export default Categories;
