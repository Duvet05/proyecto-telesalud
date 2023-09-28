import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Col xs={12} sm={4} className={classes}>
      <div {...attrs}>
        <span className="text-uppercase page-subtitle">{subtitle}</span>
        <h3 className="page-title">{title}</h3>
      </div>
    </Col>
  );
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string,
  /**
   * Additional attributes to apply to the wrapper div.
   */
  attrs: PropTypes.object,
};

export default PageTitle;
