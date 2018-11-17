import React, { Component } from 'react'
import ShoppingListItem from './ShoppingListItem';

class ShoppingList extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        {
          item: "Apple",
          pickedUp: false
        },
        {
          item: "Soup",
          pickedUp: false
        },
        {
          item: "Sausages",
          pickedUp: false
        }
      ],
      newItem: ""
    }
  }

  onItemClick = (item, index) => {
    this.setState({
      list: this.state.list.map((item, i) => {
        if (i === index) {
          item.pickedUp = !item.pickedUp
        }
        return item
      })
    })
  }

  clearShoppingList = e => {
    this.setState({
      list: [],
      newItem: ""
    })
  }

  newItemChange = e => {
    this.setState({ newItem: e.target.value })
  }

  onInputKeyPress = e => {
    if (e.key === "Enter") {
      this.setState({
        list: [...this.state.list, { item: this.state.newItem, pickedUp: false }],
        newItem: ""
      })
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
              <input className="form-control" type="text" value={this.state.newItem} onChange={this.newItemChange} onKeyPress={this.onInputKeyPress} />
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

export default ShoppingList;
