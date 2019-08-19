import {
  Button,
  Modal
} from 'react-bootstrap';

import React
from 'react';

//MMWaitModal must start with UPPER case
//msg can be sent from parent in props if you want
//actual display is controlled by closeModalCB
//sent via props.closeModalCB in parent
export default function MMWaitModal(props) {

  const mainMsgTxt = `Please confirm the update with
  Metamask (possibly a separate window) and wait for the
  transaction to be mined to the blockchain to see the
  updated changes
  `;

  if (!props.show) {
    return null;
  } else {

    return ( <
      div >
      <
      Modal show = {
        props.show
      } >
      <
      Modal.Header closeButton >
      <
      Modal.Title > Please Note! < /Modal.Title> < /
      Modal.Header > <
      Modal.Body >
      <
      font color = "red" > {
        mainMsgTxt
      } < /font> < /
      Modal.Body > <
      Modal.Footer >
      <
      Button onClick = {
        props.closeModalCB
      } > Close < /Button> < /
      Modal.Footer > <
      /Modal> <
      /div>
    );
  }
}
