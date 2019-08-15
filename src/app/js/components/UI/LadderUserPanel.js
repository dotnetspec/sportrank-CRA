import React from 'react';

export default function(props) {

  return ( <
      div > {
        props.username
      } <
      p > < /p> {
      props.txtObj.textToDisplayRank
      } <
      p > < /p> {
        props.txtObj.textToDisplayChallenger
      } <
      p > < /p> {
      props.txtObj.textToDisplayChallengerContactNo
      } <
      p > < /p> {
        props.txtObj.textToDisplayChallengerEmail
      } <
      p > < /p> {
        props.txtObj.textToDisplayContinue
      } < /div>
);
}
