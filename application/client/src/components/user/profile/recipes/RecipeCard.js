import React from 'react'
import Link from 'react-router-dom/Link';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteRecipeButton from '../../../recipes/DeleteRecipeButton';

class RecipeCard extends React.Component {
  render() {

    return (
      <div className="card mt-3 justify-content-between" style={{ maxWidth: "300px" }}>
        <Link title={`View ${this.props.recipe.title}`} to={"/recipe/show/" + this.props.recipe._id} style={{ color: "#333", textDecoration: "none" }}>
          <div className="card-body p-2 d-flex flex-column justify-content-between h-100">
            <div>
              <img className="card-img-top" src={this.props.recipe.img_url} style={{ width: "100%", height: "auto" }} alt="Card cap" />
            </div>
            <div>

              <h5 className="card-title">{this.props.recipe.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.recipe.meal}</h6>
              <p className="card-text text-dark">{this.props.recipe.desc}</p>
            </div>
          </div>
        </Link>
        <div className="card-footer d-flex justify-content-between">
          <div className="left">
          </div>
          {
            (this.props.auth.user.id === this.props.recipe.user_id) ||
              (this.props.auth.user.id === this.props.recipe.user_id._id) ||
              this.props.auth.user.admin ?
              <div className="right d-flex">
                <Link title={`Edit ${this.props.recipe.title}`} to={"/recipe/edit/" + this.props.recipe._id} style={{ color: "white" }}>
                  <span className="badge badge-pill badge-info p-3 mr-1 text-light">
                    <i className="far fa-edit"></i>
                  </span>
                </Link>
                <span>
                  <DeleteRecipeButton recipe_id={this.props.recipe._id} />
                </span>
              </div>
              : null
          }
        </div>
      </div>
    )
  }
}

RecipeCard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(RecipeCard);