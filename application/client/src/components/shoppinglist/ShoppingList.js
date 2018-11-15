import React, { Component } from 'react'

class ShoppingList extends Component {
  constructor() {
    super();
    this.state = {
      get: [
        "Apples",
        "Oranges",
        "So many pizzas"
      ],
      got: [],
      newItem: ""
    }
  }

  onGetClick = e => {
    this.setState({
      get: this.state.get.filter(item => item !== e.target.innerText),
      got: [e.target.innerText, ...this.state.got]
    })
  }

  onGotClick = e => {
    this.setState({
      got: this.state.got.filter(item => item !== e.target.innerText),
      get: [e.target.innerText, ...this.state.get]
    })
  }

  clearShoppingList = e => {
    this.setState({
      get: [],
      got: []
    })
  }

  newItemChange = e => {
    this.setState({ newItem: e.target.value })
  }

  onInputKeyPress = e => {
    if (e.key === "Enter") {
      this.setState({
        get: [...this.state.get, this.state.newItem],
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
              this.state.get.map((item, i) => (
                <li key={i} className="list-group-item" onClick={this.onGetClick} >
                  {item}
                </li>
              ))
            }
            <li className="list-group-item">

              <input className="form-control" type="text" value={this.state.newItem} onChange={this.newItemChange} onKeyPress={this.onInputKeyPress} />
            </li>
          </ul>
          <ul className="list-group my-3">
            {
              this.state.got.map((item, i) => (
                <li key={i} className="list-group-item" onClick={this.onGotClick}>
                  <del>{item}</del>
                </li>
              ))
            }
          </ul>
          {
            this.state.get.length === 0 && this.state.got.length > 0 ?
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
