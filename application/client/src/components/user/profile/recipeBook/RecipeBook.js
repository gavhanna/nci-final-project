import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getUserRecipeBook } from "../../../../actions/recipebookActions";
import Spinner from "../../../common/Spinner"
import RecipeBookCard from './RecipeBookCard';

class RecipeBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }

  }

  componentDidMount() {
    this.props.getUserRecipeBook(this.props.auth.user.id);
    this.setState({
      user: this.props.auth.user
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }


  render() {
    const loading = (<Spinner />);
    const loaded = (
      <React.Fragment>
        <h2 className="m-3 text-center title-font">{this.props.auth.user.name.split(" ")[0]}'s Recipe Book</h2>
        {
          this.props.recipebook.selected.map(recipe => (
            <RecipeBookCard recipe={recipe} />
          ))
        }
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {this.props.recipebook.loading ? loading : loaded}
      </React.Fragment>
    )
  }
}

RecipeBook.propTypes = {
  getUserRecipeBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  recipebook: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipebook: state.recipebook
})

export default connect(mapStateToProps, { getUserRecipeBook })(RecipeBook);