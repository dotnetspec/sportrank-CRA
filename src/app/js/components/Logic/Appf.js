import React from "react";
import { FetchMultipleResourceAtOnce } from "../SideEffects/io/FetchMultipleResourceAtOnce";
import { useAsync } from "react-use";

import { withRouter } from 'react-router-dom'

function Appf(){
  // const posts = useAsync(FetchMultipleResourceAtOnce, []);
  //
  // if (posts.loading) return "Loading...";
  // if (posts.error) return "Something went wrong.";
  var resourceA = {error:'Failed to load resource A', loading:'Loading...', value:'A'};
  //var car = {type:"Fiat", model:"500", color:"white"};

  //const posts = resourceA;

  return (
    <>
    <h1>My Posts</h1>
    {resourceA.loading}

    </>
  );
}
export default Appf

// export const Appf = () => {
//   const state = useAsync(FetchMultipleResourceAtOnce, []);
//
//   return (
//     <div>
//       {state.loading?
//         <div>Loading...</div>
//         : state.error?
//         <div>Error...</div>
//         : <div>Value: {state.value}</div>
//       }
//     </div>
//   );
// };
