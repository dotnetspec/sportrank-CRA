//import { Switch, Route } from 'react-router-dom';
// import { Switch } from 'react-router-dom';
// import PropsRoute from './PropsRoute';
// import Home from './Home';
// import Userchallenges from './Userchallenges';
// import CreateUser from './CreateUser';
// import UpdateUser from './UpdateUser';
// import DeactivatePlayer from './DeactivatePlayer';
// import Error from './Error';
import React, { Component } from 'react';
//import JSONops from './JSONops'
// import CreateNewRanking from './CreateNewRanking';
// import UserRankings from './UserRankings'
// import GlobalRankings from './GlobalRankings'

/**
 * Class representing the area below the header.
 * The component rendering in this area is controlled by
 * a @external "BrowserRouter"
 *
 * @extends React.Component
 */

class Landing extends Component {

  //#region Constructor
  constructor(props){
    super(props);
    this.state = {
      pathnameStr: '/',
      globalListing: true
    }
    //this.configPathname();
  }

configPathname(){
  const {pathname} = this.props.location;
  console.log('pathname prop in main.js', this.props.location.pathname)
  if(pathname.includes("srhost")){
    this.setState({ pathnameStr: '/srhost/' });
  }
}

  //#endregion


  //#region React lifecycle events

//QUESTION: why does componentDidMount not have the data from this.props.rankingJSONdata
//when it clearly gets passed to Home.js?
  componentDidMount() {
    console.log('this.props.user', this.props.user);
    console.log('this.props.error in app', this.props.error);
  }

  //REVIEW: Home page may be unnecessarily re-rendering with this approach to passing props
  //but need to pass the username and display it as a greeting and to link account with json data
  //this.props.user[1] is a quick way (not object.keys) to access the array
  render () {
    return (
      <p>Hello</p>
    )
  }
  //#endregion
}

export default Landing
