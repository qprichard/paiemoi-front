import React from "react";
import { Link, withRouter } from "react-router-dom";

const Header = () => {

  return (
    <div className="application-header">
      <div className="application-title">PAIEMOI</div>
      <div className="application-connexion">
        <Link to="/connect">Connexion</Link> / <Link to="/subscribe">Inscription</Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
