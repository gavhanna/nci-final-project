import React from 'react';
import spinner from './spinner.gif';

export default (props) => {
  const defaultStyle = {
    background: props.color ? props.color : "#3097d1"
  }

  return (
    <React.Fragment>
      {/* <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      /> */}
      <div className="m-auto d-flex justify-content-center">
        <div className="lds-ellipsis">
          <div style={defaultStyle}></div>
          <div style={defaultStyle}></div>
          <div style={defaultStyle}></div>
          <div style={defaultStyle}></div>
        </div>
      </div>
    </React.Fragment>
  );
};
