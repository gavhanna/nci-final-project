import React from 'react'
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container-fill-height landing-page">
      <div className="container-content-middle text-center">
        <h1 className="title-font" style={{ fontSize: "5rem" }}>Recipe Book</h1>
        <p>Create and share your favourite recipes!</p>
        <hr />
        <Link to="/register" className="btn btn-lg btn-pill btn-primary m-1">Register</Link>
        <Link to="/login" className="btn btn-lg btn-pill btn-info m-1">Login</Link>
      </div>
    </div>
  )
}
export default Landing;