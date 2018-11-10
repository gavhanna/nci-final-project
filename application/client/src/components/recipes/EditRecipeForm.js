import React, { Component } from 'react'
import RecipeFormInput from './RecipeFormInput';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from 'react-router-dom';
import { editRecipe } from "../../actions/recipesActions";
import classnames from "classnames";
import Spinner from '../common/Spinner';
import { storage } from "../../utils/firebase";

class EditRecipeForm extends Component {
  constructor(props) {
    super(props);
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
      errors: {},
      image: null,
      file: null
    }
  }

  componentDidMount() {
    const { recipe } = this.props;
    this.setState({
      title: recipe.title,
      img_url: recipe.img_url,
      desc: recipe.desc,
      serves: recipe.serves,
      dietary: recipe.dietary,
      meal: recipe.meal,
      preptime: recipe.preptime,
      cooktime: recipe.cooktime,
      ingredients: recipe.ingredients,
      method: recipe.method,
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onFileSelected = (e) => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
        file: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  onChangeIngredientsArray = (e) => {
    const ingredients = document.querySelectorAll(".ingredients-list");
    const arr = [];
    ingredients.forEach(i => {
      arr.push(i.value)
    })

    this.setState({ ingredients: [...arr] })
  }

  onChangeMethodArray = (e) => {
    const method = document.querySelectorAll(".method-list");
    const arr = [];
    method.forEach(i => {
      arr.push(i.value)
    })

    this.setState({ method: [...arr] })
  }

  addIngredient = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, ""] })
  }

  removeIngredientListItem = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients.splice(0, this.state.ingredients.length - 1)] })
  }

  addMethod = (e) => {
    e.preventDefault();
    this.setState({ method: [...this.state.method, ""] })
  }

  removeMethodListItem = (e) => {
    e.preventDefault();
    this.setState({ method: [...this.state.method.splice(0, this.state.method.length - 1)] })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title: this.state.title,
      img_url: this.state.img_url,
      desc: this.state.desc,
      serves: this.state.serves.toString(),
      dietary: this.state.dietary,
      meal: this.state.meal,
      preptime: this.state.preptime.toString(),
      cooktime: this.state.cooktime.toString(),
      ingredients: this.state.ingredients,
      method: this.state.method,
      id: this.props.recipe._id
    }

    if (!this.state.file) {
      console.log("there is no file");
      this.props.editRecipe(recipeData, this.props.history);

    } else if (!this.state.title || this.state.title.length < 3) {
      this.props.setErrors({ title: "Title must be between 3 and 30 characters" })

    } else {
      const { image } = this.state;
      const uploadTask = storage.ref(`recipe_images/${this.state.title}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function
          // could use this to implement a loading bar?
        },
        (err) => { console.log(err) },
        () => {
          // complete function
          storage.ref("recipe_images").child(this.state.title).getDownloadURL().then(url => {
            // console.log(url);
            // this.setState({ url })
            recipeData.img_url = url;
            console.log(recipeData);
            this.props.editRecipe(recipeData, this.props.history);
          })
        });
    }
    // this.props.editRecipe(recipeData, this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state;
    const { recipe } = this.props;

    const form = (
      <div className="container text-center mb-5">
        <div className="row text-white bg-primary text-center d-flex flex-column p-3 mb-4">
          <h1 className="title-font" style={{ fontSize: "5rem" }}>Edit {recipe.title}</h1>
          <p>Make changes to your recipe!</p>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-12 m-auto">
            <form onSubmit={this.onSubmit}>
              <div className="form-group justify-content-center">
                {
                  this.state.img_url ?
                    <div>
                      <div>
                        <h4 className="text-center">Image Preview</h4>
                        <small>Preview, not actual size</small>
                      </div>
                      <img src={this.state.file ? this.state.file : this.state.img_url} alt="Preview" className="m-3" style={{ width: "100px", height: "auto" }} />
                    </div>
                    : null
                }
                <label
                  htmlFor="fileinput"
                  className={classnames("btn btn-pill btn-primary p-2", {
                    "btn-secondary": this.state.file,
                    "is-invalid": errors.profile_pic
                  })}
                ><i className="fas fa-upload"></i> {this.state.file ? "Change Image" : "Upload Image"}</label>
                <input
                  type="file"
                  id="fileinput"
                  className="form-control-file inputfile"
                  accept="image/*"
                  onChange={this.onFileSelected}
                />
              </div>
              <div className="d-md-flex justify-content-around ">

                <div className="form-group col m-md-3 m-auto">
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
                <div className="form-group col m-md-3 m-auto">
                  <h3>Time</h3>
                  <div className="form-group">
                    <label htmlFor="preptime">Preperation Time</label>
                    <small> In minutes</small>
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
                    <small> In minutes</small>
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
                      {this.state.ingredients.length > 1 ?
                        <button
                          className="btn btn-warning btn-pill ml-1 mb-5"
                          onClick={this.removeIngredientListItem}
                        >Remove</button>
                        : null
                      }
                    </fieldset >
                    <fieldset id="method-fieldset">
                      {this.state.method.map((i, n) => {
                        return <div key={n}>
                          <RecipeFormInput
                            name={"method-" + n}
                            label={"Method " + parseInt(n + 1)}
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
                      {this.state.method.length > 1 ?
                        <button
                          className="btn btn-warning btn-pill ml-1 mb-5"
                          onClick={this.removeMethodListItem}
                        >Remove</button>
                        : null
                      }
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

    return (
      <React.Fragment>
        {recipe.loading ? <Spinner /> : form}
      </React.Fragment>
    )
  }
}

EditRecipeForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editRecipe: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(mapStateToProps, { editRecipe })(withRouter(EditRecipeForm));
