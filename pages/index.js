import React, { useEffect } from 'react'
import Calendar from '../components/Calendar'

const Counter = props => {
  if (isServer) {
    return null
  }

  return <Calendar title="Calendar" />
}

Counter.getInitialProps = async ({ isServer }) => {
  return { isServer }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  }
}

export default Counter
