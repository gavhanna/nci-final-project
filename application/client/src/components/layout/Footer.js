import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ background: "#205788" }} className="row text-white d-flex p-5 border-top border-dark">
      <div className="col-12 col-md-6">
        <div className="container">
          <p><i className="fas fa-terminal"></i> Created by <Link className="text-white" to="https://gavhanna.github.io">Gav Hanna</Link></p>
          <p><i className="fab fa-js-square"></i> Built using the MERN stack</p>
          <p>&copy; Gavin Hanna {new Date().getFullYear()}</p>
        </div>
      </div>
      <div className="col-12 col-md-6 text-right">
        <div className="container">
          <p>
            <a className="text-white" href="mailto:gavhanna@gmail.com">
              Email me directly <i className="far fa-envelope"></i>
            </a>
          </p>
          <p>
            <a className="text-white" href="https://www.linkedin.com/in/gavhanna">
              Linkedin <i className="fab fa-linkedin"></i>
            </a>
          </p>
          <p>
            <a className="text-white" href="https://gavhanna.github.io">
              Portfolio <i className="fas fa-home"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}


export default Footer;