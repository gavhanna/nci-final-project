import React, { Component } from 'react'
import RecipeFormInput from './RecipeFormInput';

class RecipeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      img_url: "",
      desc: "",
      serves: "",
      dietary: "",
      meal: "",
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

  render() {
    return (
      <div className="container text-center mt-5 mb-5">
        <h1 className="title-font" style={{ fontSize: "5rem" }}>Add New Recipe</h1>
        <p>Publish your new recipe!</p>
        <div className="row">
          <div className="col-md-8 col-sm-12 m-auto">
            <form>
              <div className="d-md-flex justify-content-around ">

                <div className="form-group col">
                  <h3>General Info</h3>
                  <div className="form-group">
                    <label htmlFor="name">Title</label>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="e.g. Tasty Stew"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      name="img_url"
                      type="text"
                      className="form-control"
                      id="img_url"
                      placeholder="e.g. https://pics.com/pic"
                      value={this.state.img_url}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="short-desc">Short Description</label>
                    <input
                      name="desc"
                      type="text"
                      className="form-control"
                      id="desc"
                      placeholder="e.g. Everything you ever wanted!"
                      value={this.state.desc}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serves">Serves</label>
                    <input
                      name="serves"
                      type="number"
                      min="1"
                      className="form-control"
                      id="serves"
                      placeholder="1"
                      value={this.state.serves}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dietary">Dietary</label>
                    <select
                      className="form-control"
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="meal">Meal</label>
                    <select
                      className="form-control"
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
                      className="form-control"
                      id="preptime"
                      placeholder="30"
                      value={this.state.preptime}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cooktime">Cooking Time</label>
                    <small>In minutes</small>
                    <input
                      name="cooktime"
                      type="number"
                      min="1"
                      className="form-control"
                      id="cooktime"
                      placeholder="10"
                      value={this.state.cooktime}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col">
                    <h3>Details</h3>
                    <fieldset id="ingredients-fieldset" onChange={this.onChangeIngredientsArray}>
                      {this.state.ingredients.map((i, n) => {
                        return <RecipeFormInput
                          name={"ingredient-" + n}
                          label={"Ingredient " + parseInt(n + 1)}
                          value={this.state.ingredients[n]}
                          helperClass="ingredients-list" />
                      })}
                      <button
                        className="btn btn-primary btn-pill"
                        onClick={this.addIngredient}
                      >+</button>
                    </fieldset >
                    <fieldset id="method-fieldset" onChange={this.onChangeMethodArray}>
                      {this.state.method.map((i, n) => {
                        return <RecipeFormInput
                          name={"method-" + n}
                          label={"method " + parseInt(n + 1)}
                          value={this.state.method[n]}
                          helperClass="method-list" />
                      })}
                      <button
                        className="btn btn-primary btn-pill"
                        onClick={this.addMethod}
                      >+</button>
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

export default RecipeForm;
