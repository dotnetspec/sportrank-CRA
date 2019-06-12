
import React from 'react'
import axiosMock from 'axios'
//import {render, fireEvent, cleanup, wait} from '../'
//import {render, fireEvent, cleanup, wait} from '@testing-library/react'
import 'jest-dom/extend-expect'
//import {renderWithRouter} from '../../../utils'


class Fetch extends React.Component {
  state = {}
  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.fetch()
    }
  }
  fetch = async () => {
    const response = await axiosMock.get(this.props.url)
    this.setState({data: response.data})
  }
  render() {
    const {data} = this.state
    return (
      <div>
        <button onClick={this.fetch}>Fetch</button>
        {data ? <span>{data.greeting}</span> : null}
      </div>
    )
  }
}
export default Fetch
