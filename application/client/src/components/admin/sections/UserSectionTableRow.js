import React from 'react'
import { Link } from "react-router-dom";

export default function UserSectionTableRow(props) {
  const onSetClick = e => {
    props.setAdminStatus(props.user.username);
  }
  const onRevokeClick = e => {
    props.revokeAdminStatus(props.user.username);
  }

  return (
    <tr>
      <th scope="row">
        <img className="rounded-circle" style={{ width: "30px", height: "auto" }} src={props.user.img_url || "https://firebasestorage.googleapis.com/v0/b/recipebook-617e4.appspot.com/o/placeholder.png?alt=media&token=07c609bd-01f2-4938-98cd-cdcd0f0a592f"} alt="User" />
        &nbsp; {props.user.name} <small>@{props.user.username}</small>
      </th>
      <td>
        {props.user.admin ?
          <button
          className="btn btn-pill btn-info"
          onClick={onRevokeClick}>True</button> :
          <button 
          className="btn btn-pill btn-warning"
          onClick={onSetClick}>False</button>
        }
      </td>
      <td>
        <Link className="btn btn-pill btn-info" to={`/profile/${props.user.username}`}>View</Link>
      </td>
    </tr>
  )
}
