import axios from 'axios'

export const saveJson = (json) =>
  axios.post('https://localhost:3000/json', json)

  // export const loadJson = () =>
  //   axios.get('http://localhost:3000/json/GlobalRankings.json')

    // export const loadJson = () =>
    //   axios.get('http://localhost:3000/json/globalRankings')

      export const loadJson = () =>
        axios.get('https://localhost:3000')
