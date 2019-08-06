//import axios from 'axios';
//importing files require curly brackets e.g.:
//import { userInfoText, userInfoText2 } from './TextOps'
/**
 * Functional component handling text operations
 * Talks to Home etc.
 */
const userInfoText = (currentChallengerName, currentChallengerContactNo,
currentChallengerEmail, currentUserRank) => {
      let userInfoObj = {
        textToDisplayRank: '',
        textToDisplayChallenger: '',
        textToDisplayChallengerContactNo:'',
        textToDisplayChallengerEmail:'',
        textToDisplayContinue:''
      }
      userInfoObj.textToDisplayRank = 'Your current rank is: ' + currentUserRank;
      if (currentChallengerName !== 'AVAILABLE') {
        userInfoObj.textToDisplayChallenger = 'Your current challenge is VS ' + currentChallengerName;
        userInfoObj.textToDisplayChallengerContactNo = 'Your challenger contact number is  ' + currentChallengerContactNo
        userInfoObj.textToDisplayChallengerEmail = 'Your challenger email is  ' + currentChallengerEmail
        userInfoObj.textToDisplayContinue = 'Enter a result against ' + currentChallengerName + ' to continue';
      } else {
        userInfoObj.textToDisplayChallenger += 'You do NOT currently have a challenge'
        userInfoObj.textToDisplayContinue += 'Please select an AVAILABLE opponent (below) to challenge: '
      }
      return userInfoObj;
    }

//just an example 2nd function ...
    const userInfoText2 = () => {
        return 'hello';
    }
export { userInfoText, userInfoText2 };
