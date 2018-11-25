import React, { Component } from 'react'
import { connect } from "react-redux";
import RecipeSectionTableRow from './RecipeSectionTableRow';
import BarChart from "../charts/BarChart";
import Spinner from "../../common/Spinner";
import DonutChart from '../charts/DonutChart';

class RecipeSection extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      data: [],
      categories: [],
      loading: true
    }
  }

  componentDidMount() {
    if (this.props.auth.admin.users) {
      const { recipes } = this.props.auth.admin;
      const categories = ["Breakfast", "Brunch", "Lunch", "Dinner", "Supper", "Snack"];
      const catCount = [0, 0, 0, 0, 0, 0];
      recipes.forEach(recipe => {
        const idx = categories.indexOf(recipe.meal);
        catCount[idx] = catCount[idx] + 1;
      })

      this.setState({
        name: "Published Recipes by Meal Type",
        data: catCount,
        categories: categories,
        loading: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.admin.users) {

      const { recipes } = nextProps.auth.admin;
      const categories = ["Breakfast", "Brunch", "Lunch", "Dinner", "Supper", "Snack"];
      const catCount = [0, 0, 0, 0, 0, 0];
      recipes.forEach(recipe => {
        const idx = categories.indexOf(recipe.meal);
        catCount[idx] = catCount[idx] + 1;
      })

      this.setState({
        name: "Published Recipes by Meal Type",
        data: catCount,
        categories: categories,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className="col">
        <h3 className="text-center">Recipe Info</h3>
        {
          !this.state.loading ?
            <div className="my-5">
              {/* <BarChart
                categories={this.state.categories}
                name={this.state.name}
                data={this.state.data} /> */}
              <DonutChart
                text={"Recipes by Meal Type"}
                labels={this.state.categories}
                series={this.state.data}
              />
            </div>
            : <Spinner />
        }
        <h3 className="text-center">Recipe List</h3>
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
  nothing: {}
})

export default connect(mapStateToProps)(RecipeSection);