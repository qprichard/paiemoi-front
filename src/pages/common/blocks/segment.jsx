import React from "react";
import PropTypes from "prop-types";
import { Segment as Block, Header } from "semantic-ui-react";
import "./style.scss";

const Segment = ({ title, as, children, center, ...props }) => (
  <Block>
    { title ? <Header className={`segment-header ${center ? "center" : ""}`} as= { as } {...props}>{ title }</Header> : null }
    { children }
  </Block>
)

Segment.propTypes = {
  title: PropTypes.string,
  as: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

Segment.defaultProps = {
  title: null,
  as: "h2",
  center: false,
}

export default Segment;
