import React from "react";
//import { getResource } from "./getResource";
import { useAsync, getResource } from "react-use";
import { withRouter } from 'react-router-dom'
//import { useAsync } from "./useAsync";

const newrankIdCB = '5c81c1e944e81057efe3e2c8';
let httpStr = 'https://api.jsonbin.io/b/' + newrankIdCB + '/latest';

function FetchMultipleResourceAtOnce () {
  // const resourceA = useAsync(getResource, [httpStr]);
  // const resourceB = useAsync(getResource, [httpStr]);

  const resourceA = useAsync(getResource, ['A']);
  const resourceB = useAsync(getResource, ['B']);

  return (
    <div>
      {resourceA.error
        ? "Failed to load resource A"
        : resourceA.loading
        ? "Loading A..."
        : resourceA.value}
      {resourceB.error
        ? "Failed to load resource B"
        : resourceB.loading
        ? "Loading B..."
        : resourceB.value}
    </div>
  );
}
export default withRouter(FetchMultipleResourceAtOnce)
