import React, { Component } from 'react'
import ShoppingListItem from './ShoppingListItem';
import { connect } from "react-redux";
import {
  getShoppingList,
  addItemToShoppingList,
  pickupItem,
  putItemBack,
  clearShoppingList
}
  from "../../actions/shoppingListActions"

class ShoppingList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      newItem: ""
    }
  }

  componentDidMount() {
    this.props.getShoppingList(this.props.auth.user.id);
    console.log(this.props);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log(nextProps.shoppingList);

      this.setState({
        list: nextProps.shoppingList.shoppingList
      })
    }
  }

  onItemClick = (item) => {
    item.pickedUp ?
      this.props.putItemBack(item._id) :
      this.props.pickupItem(item._id);

  }

  clearShoppingList = e => {
    this.props.clearShoppingList();
  }

  newItemChange = e => {
    this.setState({ newItem: e.target.value })
  }

  onInputKeyPress = e => {
    if (e.key === "Enter") {
      this.props.addItemToShoppingList(this.state.newItem);
      this.setState({ newItem: "" })
    }

  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 m-auto">
          <h2 className="text-center">ShoppingList</h2>
          <ul className="list-group my-3">
            {
              this.state.list.map((item, i) => {
                if (!item.pickedUp) {
                  return <ShoppingListItem pickedUp={item.pickedUp} key={i} index={i} item={item} onItemClick={this.onItemClick} />
                } else {
                  return null;
                }
              })
            }
            <li className="list-group-item">
              <input className="form-control"
                type="text"
                value={this.state.newItem}
                onChange={this.newItemChange}
                onKeyPress={this.onInputKeyPress}
                placeholder="What do you need?" />
            </li>
          </ul>
          <ul className="list-group my-3">
            {
              this.state.list.map((item, i) => {
                if (item.pickedUp) {
                  return <ShoppingListItem pickedUp={item.pickedUp} key={i} index={i} item={item} onItemClick={this.onItemClick} />
                } else {
                  return null;
                }
              })
            }
          </ul>
          {
            this.state.list.filter(item => !item.pickedUp).length === 0 && this.state.list.length > 0 ?
              <button
                className="btn btn-pill btn-info"
                onClick={this.clearShoppingList}
              >Clear Shopping List</button>
              : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  shoppingList: state.shoppingList
})

export default connect(mapStateToProps, { getShoppingList, addItemToShoppingList, pickupItem, putItemBack, clearShoppingList })(ShoppingList);
