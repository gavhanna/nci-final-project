import React, { Component } from 'react'
import ShoppingListItem from './ShoppingListItem';
import classnames from "classnames";
import { connect } from "react-redux";
import {
  getShoppingList,
  addItemToShoppingList,
  pickupItem,
  putItemBack,
  deleteItemFromShoppingList,
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
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

  onItemDelete = item_id => {
    this.props.deleteItemFromShoppingList(item_id);
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
    const { errors } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 m-auto">
          <h2 className="text-center title-font my-5">My Shopping List</h2>
          <ul className="list-group my-3" title="Click to move to 'alread have' list">
            {
              this.state.list.map((item, i) => {
                if (!item.pickedUp) {
                  return <ShoppingListItem
                    pickedUp={item.pickedUp}
                    key={i} index={i}
                    item={item}
                    onItemClick={this.onItemClick}
                    onDelete={this.onItemDelete}
                  />
                } else {
                  return null;
                }
              })
            }
            <li className="list-group-item">
              <input
                type="text"
                maxLength="50"
                value={this.state.newItem}
                onChange={this.newItemChange}
                onKeyPress={this.onInputKeyPress}
                placeholder="What do you need?"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.item
                })} />
            </li>
          </ul>
          <ul className="list-group my-3" title="Click to move to 'must get' list">
            {
              this.state.list.map((item, i) => {
                if (item.pickedUp) {
                  return <ShoppingListItem
                    pickedUp={item.pickedUp}
                    key={i} index={i}
                    item={item}
                    onItemClick={this.onItemClick}
                    onDelete={this.onItemDelete}
                  />
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
  shoppingList: state.shoppingList,
  errors: state.errors
})

export default connect(mapStateToProps, { getShoppingList, addItemToShoppingList, pickupItem, putItemBack, deleteItemFromShoppingList, clearShoppingList })(ShoppingList);
