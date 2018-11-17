import React from 'react'

export default function ShoppingListItem(props) {
  const clickHandler = e => {
    props.onItemClick(props.item);
  }

  return (
    <li key={props.index} className="list-group-item" onClick={clickHandler}>
      {
        props.pickedUp ?
          <del>{props.item.item}</del> :
          <span>{props.item.item}	</span>
      }
    </li>
  )
}
