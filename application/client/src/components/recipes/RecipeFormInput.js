import React from 'react'

function RecipeFormInput(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        type="text"
        className={"form-control " + props.helperClass}
        id={props.name}
        placeholder="e.g. Tomato"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default RecipeFormInput;
