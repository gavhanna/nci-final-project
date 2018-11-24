import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RecipeSectionTableRow from './RecipeSectionTableRow';

class RecipeSection extends Component {

  render() {
    return (
      <div className="col">
        <h3 className="text-center">Recipes</h3>
        <table className="table">
          <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">User</th>
            <th scope="col">Comments</th>
            <th scope="col">Likes</th>
            <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {/* intentionally not showing the currentl logged in user so
            they cant accidentally revoke their own admin rights */}
            {this.props.auth.admin.recipes && this.props.auth.admin.recipes.map(recipe => (
              <RecipeSectionTableRow 
              key={recipe._id} 
              recipe={recipe}
               />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(RecipeSection);