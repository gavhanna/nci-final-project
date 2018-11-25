import React, { Component } from 'react'
import { Link } from "react-router-dom";
import classnames from "classnames";

class Dash extends Component {
  constructor() {
    super();
    this.state = {
      navLocation: "overview"
    }
  }

  componentDidMount() {
    const locationArray = window.location.pathname.split("/");
    const currentSelectedLink = locationArray[locationArray.length - 1];
    if (currentSelectedLink === "admin") {
      this.setState({ navLocation: "overview" });
    } else if (currentSelectedLink === "users") {
      this.setState({ navLocation: "users" });
    } else if (currentSelectedLink === "recipes") {
      this.setState({ navLocation: "recipes" });
    }
  }

  navClick = e => {
    const current = e.target.innerText.toLowerCase();

    if (current === "overview") {
      this.setState({ navLocation: "overview" });
    } else if (current === "users") {
      this.setState({ navLocation: "users" });
    } else if (current === "recipes") {
      this.setState({ navLocation: "recipes" });
    }
  }

  render() {
    return (
      <div>
        <ul className="list-group d-flex flex-row justify-content-center">
          <Link
            style={{ textDecoration: "none" }}
            to="/admin/">
            <li
              onClick={this.navClick}
              className={classnames("list-group-item", {
                "active": this.state.navLocation === "overview",
              })}
            >
              Overview
            </li>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to="/admin/users">
            <li
              onClick={this.navClick}
              className={classnames("list-group-item", {
                "active": this.state.navLocation === "users",
              })} >
              Users
            </li>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to="/admin/recipes">
            <li
              onClick={this.navClick}
              className={classnames("list-group-item", {
                "active": this.state.navLocation === "recipes",
              })} >
              Recipes
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}
export default Dash;