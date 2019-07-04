import React from "react";
//putting curly brackets around this import will prevent it's export ...:
import FetchMultipleResourceAtOnce from "../SideEffects/io/FetchMultipleResourceAtOnce";
//import useKeyboardJs from 'react-use/esm/useKeyboardJs';
import { useAsync } from "react-use";

import { withRouter } from 'react-router-dom'

function Appf(){
  const resourceA = useAsync(FetchMultipleResourceAtOnce, []);
  //
  //if (resourceA.loading) return "Loading...";
  // if (posts.error) return "Something went wrong.";
  //var resourceA = {error:'Failed to load resource A', loading:'Loading...', value:'A'};
  //var car = {type:"Fiat", model:"500", color:"white"};

  //const posts = resourceA;

  return (
    <>
    <h1>My Posts</h1>
    {resourceA.value}

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
