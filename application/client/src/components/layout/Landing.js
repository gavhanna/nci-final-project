import React from 'react'

const Landing = () => {
  return (
    <div className="container-fill-height landing-page">
      <div className="container-content-middle text-center">
        <h1 className="title-font" style={{ fontSize: "5rem" }}>Recipe Book</h1>
        <p>Create and share your favourite recipes!</p>
        <hr />
        <button type="button" className="btn btn-lg btn-pill btn-primary">Register</button>
        <button type="button" className="btn btn-lg btn-pill btn-info">Login</button>
      </div>
    </div>
  )
}
export default Landing;