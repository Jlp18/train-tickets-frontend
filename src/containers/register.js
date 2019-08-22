import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Spin,
  message,
  Radio
} from 'antd';
import {
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';
import * as storage from '../utils/storage';
import {
  USERNAME,
  PASSWORD,
  WEBSITE_NAME,
  USERID
} from '../constants';

const FormItem = Form.Item;

@connect(
  (state) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching
  }),
  actions
)
@Form.create()
export default class Login extends React.Component {
  state = {
    register: false,
    username: '',
    password: '',
    repassword: ''
  }

  static propTypes = {
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if (this.props.location.state) {
      message.warning(this.props.location.state.message)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      //console.log(values.identityCard.slice(-4))
      
      if (!err) {
        if(values.password !== values.repassword){
          message.error("密码不一致")
        }
        else{
          const userId = values.identityCard.slice(-4);
          await this.props.register(userId, values.username, values.password, values.identityCard, values.age, values.gender, values.phone)

          if (this.props.error) {
            message.error(this.props.error)
          } else {
            message.success('注册成功')
            storage.setStorage(USERID, userId)
            this.setState({
              register: true
            })
          }

          if (values.remember === true) {
            storage.setStorage(USERNAME, values.username)
            storage.setStorage(PASSWORD, values.password)
          } else {
            storage.removeStorage(USERNAME, values.username)
            storage.removeStorage(PASSWORD, values.password)
          }
        }
        
      }
    })
  }

  render() {
    const {
      isFetching,
      form
    } = this.props

    const {
      getFieldDecorator
    } = form

    const {
      register
    } = this.state

    return  (register) ? (
        <Redirect
          to={{
            pathname: '/orders',
            form: {
              from: this.props.location
            }
          }}
        />
      ) : (
        <div className="page page-login vertical-align">
          <div className="page-content vertical-align-middle">
            <div className="brand">
              <img src={logo} alt="..."/>
              <h2 className="brand-text">
                {WEBSITE_NAME}
              </h2>
            </div>
            <p>注册</p>
            <Form
              style={{textAlign: 'left'}}
              onSubmit={this.handleSubmit}
            >
              <FormItem>
                {
                  getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入账号'}]
                  })(
                    <Input
                      placeholder="账号"
                    />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码'}]
                  })(
                    <Input
                      type="password"
                      placeholder="密码"
                    />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('repassword', {
                    rules: [{ required: true, message: '请再次确认密码'}]
                  })(
                    <Input
                      type="password"
                      placeholder="确认密码"
                    />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('identityCard', {
                    rules: [{ required: true, message: '请输入身份证号码'}]
                  })(
                    <Input
                      placeholder="身份证号码"
                    />
                  )
                }
              </FormItem>
              <FormItem>
              <FormItem>
                {
                  getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入电话号码'}]
                  })(
                    <Input
                      placeholder="电话号码"
                    />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('age', {
                    rules: [{ required: true, message: '请输入年龄'}]
                  })(
                    <Input
                      placeholder="年龄"
                    />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('gender', {
                    rules: [{ required: true, message: '请选择性别'}]
                  })(
                    <Radio.Group style={{textAlign: 'center'}}>
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                    </Radio.Group>
                  )
                }
              </FormItem>
                <Button
                  className="btn-login"
                  type="primary"
                  htmlType="submit"
                >
                  {
                    isFetching ? (
                      <Spin />
                    ) : ''
                  }
                  注册
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      )
  }
}
