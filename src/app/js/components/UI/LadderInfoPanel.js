import React from 'react';
import JSONops from '../Logic/JSONops';

export default function (props) {
  let jsonWarningTxt = '';
  //only need to test the chosen ranking list ..
  if(!JSONops.isDefinedJson(props.rankingJSONdata)){
    jsonWarningTxt = 'JSON file for chosen ranking undefined. Please contact administrator. Thank you.'
  }
  return (
    <div>
    <
    h2 > {
      jsonWarningTxt
    } <
    /h2><
    h2 > {
      props.jsonObj.textToDisplayRankName
    } <
    /h2> <
    h4 > {
      props.jsonObj.textToDisplayRankDesc
    } <
    /h4></div>
  );
}
