import React from "react";
import PropTypes from "prop-types";
import Header from "./header";
import "./style.scss";

const ApplicationContainer = ({ children }) => {

  return(
    <div className="application">
      <Header/>
      <div className="application-content">
        { children }
      </div>
    </div>
  )
}

ApplicationContainer.propTypes = {
  children: PropTypes.any.isRequired,
}


export default ApplicationContainer;
