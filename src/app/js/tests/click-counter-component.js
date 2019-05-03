import React, { Fragment } from 'react';
export default ({clicks}) =>
  <Fragment>
   <span className="clicks-count">{clicks}</span>
    <button className="click-button">Click</button>
  </Fragment>
;
