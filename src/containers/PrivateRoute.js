import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';
// import storage from '../utils';
// import {
//   USER_ID,
//   TOKEN
// } from '../constants';
import * as untils from '../utils'
import {USERID} from '../constants'


@connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  })
)
export default class PrivateRoute extends React.Component {

  static state = {
    user_id: ''
  }

  componentWillMount() {
    const userId = untils.getStorage(USERID)
    console.log("u_id"+userId)
    this.setState({
      user_id: userId
    })
  }

  handleRender = () => {
    const {
      isAuthenticated,
      component: ComposedComponent
    } = this.props

    const {user_id} = this.state
    if(isAuthenticated){
      return (
        <ComposedComponent {...this.props} />
      )
    }else{
      return (
        <Redirect
          to={{
            pathname: '/signin',
            state: {
              from: this.props.location,
              message: '请先登录哦~'
            }
          }}
        />
      )
    }
      

  }

  render() {
    const {
      component,
      ...rest
    } = this.props

    return (
      <Route {...rest} render={this.handleRender} />
    )
  }
}
