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
    console.log(this);

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
    console.log(e.target);

    // const current = e.target.href.split("/").pop();
    const current = e.target.innerText.toLowerCase();
    console.log(current);

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
        <h2 className="title-font text-center mt-5">Dash</h2>
        <ul className="list-group">
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
        </ul>
        <ul className="list-group">
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
        </ul>
        <ul className="list-group">
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