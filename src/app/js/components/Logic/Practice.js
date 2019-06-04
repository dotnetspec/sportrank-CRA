// Test.js
//import React, { Component } from 'react';
import React from 'react';

// class Practice extends Component {
//   componentDidMount() {
//     this.func();
//   }
//   func = () => {
//     // noop
//   };
//   render() {
//     return null;
//   }
// }
//
// export default Practice

export const Practice = () => {
  //'value' here is equivalent of a state var in an object component
  const [value, setValue] = React.useState('initial state');

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React Function Component!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};

export const setValInPractice = (newState) => ({
  value: newState.value,
});
