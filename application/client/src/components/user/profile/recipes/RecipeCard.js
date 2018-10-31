import React from 'react'
import Link from 'react-router-dom/Link';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteRecipeButton from '../../../recipes/DeleteRecipeButton';

class RecipeCard extends React.Component {
  render() {

    return (
      <div className="col-sm-12 col-md-6 col-lg-4 m-auto">
        <div className="card mt-3">
          <img className="card-img-top" src={this.props.recipe.img_url} style={{ width: "100%", height: "auto" }} alt="Card cap" />
          <div className="card-body p-2">
            <h5 className="card-title">{this.props.recipe.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.props.recipe.meal}</h6>
            <p className="card-text">{this.props.recipe.desc}</p>
            <Link to={"/recipe/show/" + this.props.recipe._id} className="card-link">View</Link>
            {
              this.props.auth.user.id === this.props.recipe.user_id ?
                <span style={{ position: "absolute", bottom: "10px", right: "10px" }}>
                  <DeleteRecipeButton recipe_id={this.props.recipe._id} />
                </span>
                : null
            }
          </div>
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