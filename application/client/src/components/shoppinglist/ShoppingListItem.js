import React from 'react'

export default function ShoppingListItem(props) {
  const clickHandler = e => {
    props.onItemClick(props.item);
  }

  const onDeleteClick = e => {
    props.onDelete(props.item._id)
  }

  return (
    <React.Fragment>
      <li key={props.index} className="list-group-item" onClick={clickHandler} style={{ position: "relative" }}>
        {
          props.pickedUp ?
            <del>{props.item.item}</del> :
            <span>{props.item.item}	</span>
        }
        <span
          className="badge badge-pill badge-warning"
          style={{ position: "absolute", right: "10px", top: "14px", zIndex: "10" }}
          onClick={onDeleteClick}>X</span>
      </li>
    </React.Fragment>
  )
}
