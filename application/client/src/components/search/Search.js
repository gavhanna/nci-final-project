import React, { Component } from 'react';
import axios from "axios";
import RecipeCard from '../user/profile/recipes/RecipeCard';
import { Link } from "react-router-dom";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      recipes: [],
      users: [],
      searched: false
    }
  }

  onSearch = e => {
    if (e.key === "Enter") {
      if (this.state.input.length > 0) {
        this.setState({ searched: true });
        axios.get(`api/search/recipes/${this.state.input}`)
          .then(res => {
            console.log(res);
            this.setState({ recipes: res.data })
          })
        axios.get(`api/search/users/${this.state.input}`)
          .then(res => {
            console.log(res);
            this.setState({ users: res.data })
          })
      }
    }
  }

  onInputChange = e => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h2 className="title-font text-center">Search</h2>
            <p className="text-center">Search for Recipes and Users</p>
            <div className="col-12 col-sm-6 mx-auto">
              <input
                type="text"
                className="text-center form-control form-control-lg w-100 mx-auto"
                value={this.state.input}
                onKeyPress={this.onSearch}
                onChange={this.onInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-5">
            {
              this.state.recipes.length > 0 && <h3 className="text-center">Recipes</h3>
            }
          </div>
          <div className="col-12 pd-2 d-flex flex-row flex-wrap">
            {
              this.state.recipes.length > 0 ? this.state.recipes.map(recipe =>
                <span key={recipe._id} className="mx-auto">
                  <RecipeCard key={recipe._id} recipe={recipe} />
                </span>
              )
                : this.state.searched && <h3 className="text-center mx-auto">No recipes found</h3>
            }
          </div>
          <hr />
          <div className="col-12 pt-5">
            {
              this.state.users.length > 0 && <h3 className="text-center">Users</h3>
            }
          </div>
          <div className="col-12 col-sm-8 mx-auto pd-2 d-flex flex-row flex-wrap">
            <ul className="list-group w-100">
              {
                this.state.users.length > 0 ? this.state.users.map(user =>
                  <Link style={{textDecoration: "none"}} to={`/profile/${user.username}/recipes`}>
                    <li key={user._id} className="text-dark list-group-item mx-auto">
                      <span style={{width: "33%"}}>
                        <img className="rounded-circle" src={user.img_url ? user.img_url : "https://firebasestorage.googleapis.com/v0/b/recipebook-617e4.appspot.com/o/placeholder.png?alt=media&token=07c609bd-01f2-4938-98cd-cdcd0f0a592f"} alt="Profile" style={{ width: "50px", height: "auto" }} />
                      </span>
                      <span style={{width: "33%"}} className="h3 text-center">{user.name}</span>
                      <span style={{width: "33%"}} className="text-right">@{user.username}</span>
                    </li>
                  </Link>
                )
                  : this.state.searched && <h3 className="text-center mx-auto">No users found</h3>
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;