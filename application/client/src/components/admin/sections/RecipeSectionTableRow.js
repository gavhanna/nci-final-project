import React from 'react'
import { Link } from "react-router-dom";

export default function RecipeSectionTableRow(props) {
  const onSetClick = e => {
    props.setAdminStatus(props.user.username);
  }
  const onRevokeClick = e => {
    props.revokeAdminStatus(props.user.username);
  }

  return (
    <tr>
      <th scope="row">
        <img className="rounded-circle" style={{ width: "30px", height: "auto" }} src={props.recipe.img_url || "https://firebasestorage.googleapis.com/v0/b/recipebook-617e4.appspot.com/o/placeholder.png?alt=media&token=07c609bd-01f2-4938-98cd-cdcd0f0a592f"} alt="User" />
        &nbsp; {props.recipe.title}
      </th>
      <td>
        <p> <Link to={`/profile/${props.recipe.user_id.username}`}>{props.recipe.user_id.username}</Link></p>
      </td>
      <td>
        <p>{props.recipe.comments.length}</p>
      </td>
      <td>
        <p>{props.recipe.likes.length}</p>
      </td>
      <td>
        <Link className="btn btn-pill btn-info" to={`/recipe/show/${props.recipe._id}`}>View</Link>
      </td>
    </tr>
  )
}
