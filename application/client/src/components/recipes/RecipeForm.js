import React, { Component } from 'react'
import RecipeFormInput from './RecipeFormInput';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { createNewRecipe } from "../../actions/recipesActions"
import classnames from "classnames";

class RecipeForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img_url: "",
      desc: "",
      serves: "",
      dietary: "Vegetarian",
      meal: "Breakfast",
      preptime: "",
      cooktime: "",
      ingredients: [""],
      method: [""],
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeIngredientsArray = (e) => {
    const ingredients = document.querySelectorAll(".ingredients-list");
    const arr = [];
    ingredients.forEach(i => {
      arr.push(i.value)
    })
    console.log(arr);

    this.setState({ ingredients: [...arr] })
  }

  onChangeMethodArray = (e) => {
    const method = document.querySelectorAll(".method-list");
    const arr = [];
    method.forEach(i => {
      arr.push(i.value)
    })
    console.log(arr);

    this.setState({ method: [...arr] })
  }

  addIngredient = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, ""] })
  }
  addMethod = (e) => {
    e.preventDefault();
    this.setState({ method: [...this.state.method, ""] })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title: this.state.title,
      img_url: this.state.img_url,
      desc: this.state.desc,
      serves: this.state.serves,
      dietary: this.state.dietary,
      meal: this.state.meal,
      preptime: this.state.preptime,
      cooktime: this.state.cooktime,
      ingredients: this.state.ingredients,
      method: this.state.method,
    }

    console.log(recipeData);
    this.props.createNewRecipe(recipeData, this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container text-center mt-5 mb-5">
        <h1 className="title-font" style={{ fontSize: "5rem" }}>Add New Recipe</h1>
        <p>Publish your new recipe!</p>
        {errors && errors.title}
        <div className="row">
          <div className="col-md-8 col-sm-12 m-auto">
            <form onSubmit={this.onSubmit}>
              <div className="d-md-flex justify-content-around ">

                <div className="form-group col">
                  <h3>General Info</h3>
                  <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input
                      name="title"
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.title
                      })}
                      id="title"
                      placeholder="e.g. Tasty Stew"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                    {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      name="img_url"
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.img_url
                      })}
                      id="img_url"
                      placeholder="e.g. https://pics.com/pic"
                      value={this.state.img_url}
                      onChange={this.onChange}
                    />
                    {errors.img_url && (<div className="invalid-feedback">{errors.img_url}</div>)}
                  </div>
                  <div className="form-group">
                    <label htmlFor="short-desc">Short Description</label>
                    <input
                      name="desc"
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.desc
                      })}
                      id="desc"
                      placeholder="e.g. Everything you ever wanted!"
                      value={this.state.desc}
                      onChange={this.onChange}
                    />
                    {errors.desc && (<div className="invalid-feedback">{errors.desc}</div>)}
                  </div>
                  <div className="form-group">
                    <label htmlFor="serves">Serves</label>
                    <input
                      name="serves"
                      type="number"
                      min="1"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.serves
                      })}
                      id="serves"
                      placeholder="1"
                      value={this.state.serves}
                      onChange={this.onChange}
                    />
                    {errors.serves && (<div className="invalid-feedback">{errors.serves}</div>)}
                  </div>
                  <div className="form-group">
                    <label htmlFor="dietary">Dietary</label>
                    <select
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.dietary
                      })}
                      id="dietaryselect"
                      name="dietary"
                      value={this.state.dietary}
                      onChange={this.onChange}
                    >
                      <option>Vegetarian</option>
                      <option>Pescetarian</option>
                      <option>Vegan</option>
                      <option>Carnivore</option>
                    </select>
                    {errors.dietary && (<div className="invalid-feedback">{errors.dietary}</div>)}
                  </div>
                  <div className="form-group">
                    <label htmlFor="meal">Meal</label>
                    <select
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.meal
                      })}
                      id="mealselect"
                      name="meal"
                      value={this.state.meal}
                      onChange={this.onChange}
                    >
                      <option>Breakfast</option>
                      <option>Brunch</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Supper</option>
                      <option>Snack</option>
                    </select>
                    {errors.meal && (<div className="invalid-feedback">{errors.meal}</div>)}
                  </div>
                </div>
                <div className="form-group col">
                  <h3>Time</h3>
                  <div className="form-group">
                    <label htmlFor="preptime">Preperation Time</label>
                    <small>In minutes</small>
                    <input
                      name="preptime"
                      type="number"
                      min="1"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.preptime
                      })}
                      id="preptime"
                      placeholder="30"
                      value={this.state.preptime}
                      onChange={this.onChange}
                    />
                    {errors.preptime && (<div className="invalid-feedback">{errors.preptime}</div>)}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cooktime">Cooking Time</label>
                    <small>In minutes</small>
                    <input
                      name="cooktime"
                      type="number"
                      min="1"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.preptime
                      })}
                      id="cooktime"
                      placeholder="10"
                      value={this.state.cooktime}
                      onChange={this.onChange}
                    />
                    {errors.cooktime && (<div className="invalid-feedback">{errors.cooktime}
                    </div>)}
                  </div>
                  <div className="form-group col">
                    <h3>Details</h3>
                    <fieldset id="ingredients-fieldset" >
                      {this.state.ingredients.map((i, n) => {
                        return <div key={n}>
                          <RecipeFormInput
                            name={"ingredient-" + n}
                            label={"Ingredient " + parseInt(n + 1)}
                            value={this.state.ingredients[n]}
                            helperClass={classnames("form-control ingredients-list form-control-lg", {
                              "is-invalid": errors.ingredients
                            })}
                            onChange={this.onChangeIngredientsArray} />
                        </div>
                      })}
                      {errors.ingredients && (<div className="invalid-feedback">{errors.ingredients}</div>)}
                      <button
                        className="btn btn-primary btn-pill mb-5"
                        onClick={this.addIngredient}
                      >Add Ingredient</button>
                    </fieldset >
                    <fieldset id="method-fieldset">
                      {this.state.method.map((i, n) => {
                        return <div key={n}>
                          <RecipeFormInput
                            name={"method-" + n}
                            label={"method " + parseInt(n + 1)}
                            value={this.state.method[n]}
                            helperClass={classnames("form-control method-list form-control-lg", {
                              "is-invalid": errors.method
                            })}
                            onChange={this.onChangeMethodArray} />
                        </div>
                      })}
                      {errors.method && (<div className="invalid-feedback">{errors.method}</div>)}
                      <button
                        className="btn btn-primary btn-pill mb-5"
                        onClick={this.addMethod}
                      >Add Method Step</button>
                    </fieldset >
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-lg btn-pill btn-info">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

RecipeForm.propTypes = {
  auth: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  selectedRecipe: state.recipes.selectedRecipe
})

export default connect(mapStateToProps, { createNewRecipe })(withRouter(RecipeForm));
