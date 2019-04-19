import { Grid, Row, Col, ListGroup, ListGroupItem, Button, Thumbnail } from 'react-bootstrap';
import React, { Component } from 'react';
//import imgAvatar from '../../img/avatar-default.png';
import { formatDistance } from 'date-fns'
//import { EventEmitter } from 'events';
//import EmbarkJS from '../../../src/embarkArtifacts/embarkjs';
import DSportRank from '../../../ABIaddress';
import web3 from '../../../web3';
//import Grid from 'react-bootstrap/Grid'
//import Thumbnail from 'react-bootstrap/Thumbnail'
//import PageHeader from 'react-bootstrap/PageHeader'
// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class Userchallenges extends Component {

  //#region Constructor
  constructor(props, context){
    super(props, context);
    this.state = {
      user: {},
      challenges: []
    };
    this.event = null;
  }
  //#endregion

  //#region Helper methods
  /**
   * Get the user details and subscribe to their challenge event
   */
  _init(){
    const { username } = this.props.match.params;
    this._getUserDetails(username);
    // subscribe to challenge events
    //this.getPastEvents();
    //this.getEvents1();
    this._subscribeToNewchallengeEvent(username);
  }

  /**
   * Fetches the user's details from the contract for display
   */
  _getUserDetails = async(username) => {
      // get user details and update state
      //let user = { creationDate: '' } // remove me
      let user = await DSportRank.methods.users(web3.utils.keccak256(username)).call();

      // update picture url for ipfs
      //user.picture = user.picture.length > 0 ? EmbarkJS.Storage.getUrl(user.picture) : imgAvatar;

      // format the user.creationDate for display
      user.creationDate = this._formatDate(user.creationDate);

      //console.log(user);

      this.setState({user: user});
  }

  /**
   * Subscribes to a challenge event from the contract.
   * When a challenge is received, it is appended to the list of
   * challenges.
   *
   * @param {String} username
   * @returns {null}
   */

   _subscribeToNewchallengeEvent(username){
     console.log('_subscribeToNewchallengeEvent');
     const usernameHash = web3.utils.keccak256(username);
     console.log(usernameHash);
     //console.log(username);
     this.event = DSportRank.events.Newchallenge({
        filter: {_from: usernameHash},
        fromBlock: 1
      }, (err, event) => {
        if (err){
          console.log('first err user challenges');
          //console.log(event.returnValues.challenges);
          //   console.log(this.props);
          //this.props.onError(err, 'UserChallenges._subscribeToNewChallengeEvent');
        }
     })
       .on('data', (event) => {
         let challenges = this.state.challenges;
         console.log('challenges')
         console.log(challenges)
         //this.challenges = this.challenges.bind(this);
         challenges.push({
           content: event.returnValues.challenge,
           time: this._formatDate(event.returnValues.time)
         });
         console.log('challenges')
         console.log(challenges)
         this.setState({challenges: challenges});
       })
       .on('error', function(error){
         console.log('second err');
         console.log('this.props')
         console.log(this.props)
         console.log(error)
         this.props.onError(error, 'UserChallenges._subscribeToNewChallengeEvent');
       });
 }


  //getPastEvents = async() => {
  getPastEvents() {
 // const pastEvent = DSportRank.events.getPastEvents({},{ fromBlock: 0, toBlock: 'latest' }, function(error, event){ console.log(event); })
 //                        .on('data', function(event){
 //                              console.log(event);
 //                        })

 //const eventsWatch = DSportRank.events.allEvents({fromBlock: 0, toBlock: 'latest'});
 console.log('in getPastEvents')

  let res1 = '';
  let res2 = '';

  //const DSportRank = require('Embark/contracts/DSportRank');
  //const DSportRank = require('Embark/contracts/DSportRank');

  const usernameHash = web3.utils.keccak256(this.props.match.params.username);
console.log('usernameHash')
console.log(usernameHash)
const challengeContent = 'txt tot test'

          DSportRank.events.Newchallenge({
            filter: { _from: usernameHash },
            fromBlock: 1 // must be > 0!
          })
          .on('data', (event) => {
            console.log(event)
            res1 = event.returnValues.challenge;
            res2 = challengeContent;
          })
          .on('error', function(error){
            console.log('second err');
            console.log('this.props')
            console.log(this.props)
            console.log(error)
            this.props.onError(error, 'UserChallenges.getPastEvents');
          });

console.log(res1)
console.log(res2)

      //  const pastEvents = DSportRank.events.Newchallenge({}, { fromBlock: 0, toBlock: 'latest' }).on((error, eventResult) => {
      //    console.log(pastEvents)
      //   if (error)
      //     console.log('Error in myEvent event handler: ' + error);
      //   else
      //     console.log('myEvent: ' + JSON.stringify(eventResult.args));
      // });
}

getEvents1(){

      var filter = web3.eth.filter({ address: ["0xa864Ea9d142C0997572aD7a2077A67a30a853cc0"], fromBlock: 1, toBlock: "latest" });
      var i = 0;
      filter.watch(function (error, result) {
        console.log("RESULT: Filter " + i++ + ": " + JSON.stringify(result));
      });
      filter.stopWatching();
}

//NB: not implemented yet - might be useful
// watchEvents(){
// const eventsWatch = myContract.allEvents();
//     eventsWatch.watch((err, res) => {
//       if (err) return;
//       console.log("Event:", res.event, res.args);
//     });
//   }

  /**
   * Formats an int date into a displayable date
   * @param {Number} intDate - date in seconds
   * @returns {String} prettyfied date
   */
  _formatDate(intDate){
    const padZeros = 13 - intDate.length;
    if(padZeros > 0){
      intDate *= Math.pow(10, padZeros);
    }
    return formatDistance(new Date(intDate), new Date()) + ' ago';
  }

  _cancelClick(e) {
    try {
    this.props.history.push('/');
    } catch (err) {
    // stop loading state and show the error
    console.log(err.message);
    };
  }
  //#endregion

  //#region React lifecycle events
  /**
   * Get the user details and subscribe to their challenge event
   */
  componentDidMount(){
    // EmbarkJS.onReady((err) => {
    //   this._init();
    // });

  }

  /**
   * If the username was changed (ie redirected from a new route),
   * we need to get the new user's details and subscribe to their challenge
   * event.
   */
  componentDidUpdate(prevProps){
    if(this.props.match.params.username !== prevProps.match.params.username){
      this._init();
    }
  }

  /**
   * Unsubscribe from our challenge event so we stop
   * receiving challenges.
   */
  componentWillUnmount(){
    if(!this.event) return;
    // TODO: check if this is the 'right' way to remove / stop the event listener
    //this.event.removeListener(this.event);
    //REVIEW: if don't comment here get warning in console advising against this code:
    //this.event.unsubscribe();
  }

  render(){
    const {user} = this.state;

    if (user === {}) {
      // Render loading state ...
      return (<Grid><Row><Col xs={12}>Loading...</Col></Row></Grid>);
    } else if (user.username === ''){
      return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>{ this.props.match.params.username } <small>does not exist!</small></h2>
          </Col>
        </Row>
      </Grid>);
    }else {
      // Render real UI ...
      const {username, description, picture, creationDate} = user;
      //REVIEW: class name left as 'tweet' assuming compatibility required?
      const challengeList = this.state.challenges.map(function(challenge, index){
                          return <ListGroupItem className='tweet' key={ index } header={ challenge.time }>{ challenge.content }</ListGroupItem>
                        });
      return (
        <Grid>
        <Row className="show-Grid">
          <Col xs={12} md={8} xsOffset={3} >
            <Button
              bsStyle="primary"
              //disabled={ !isValid }
              //onClick={ !isValid ? null : (e) => this._handleClick(e) }
              onClick={ (e) => this._cancelClick(e) }
            >
            Cancel
            </Button>
          </Col>
        </Row>
          <Row>
            <Col xs={12}>
              <h2>{ username } s <small>challenges</small></h2>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Thumbnail src={picture} alt={username} className='profilePic'>
                <h3>{ username }</h3>
                <p>{ description }</p>
                <p className='created'>Created { creationDate }</p>
              </Thumbnail>

            </Col>
            <Col xs={8}>
              <ListGroup className='tweets'>
                { challengeList }
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
  //#endregion
}
export default Userchallenges
