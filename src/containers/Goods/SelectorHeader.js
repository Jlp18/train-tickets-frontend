import React from 'react';
import Panel from '@/components/Panel';
import {connect} from 'react-redux';
import {
  Divider,
  Breadcrumb,
  Button,
  message,
  Form,
  Input
} from 'antd';
import {
  authError,
  fetchUsers
} from '../../actions/index';

import userService from '../../services/userService';
import * as untils from '../../utils'
import { USERID, getUerInfo_URL, headers, PASSWORD } from '../../constants'
import axios from 'axios';


const FormItem = Form.Item


@connect(
  state => ({

  }),
  dispatch => ({
    authError: (errorMessage) => dispatch(authError(errorMessage)),

  })
)

@Form.create()

export default class SelectorHeader extends React.Component {

  state={
    value: ''
  }

  // 提交事件
  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log("form data:"+values.age)
      if (err) {
        return;
      }

      // 调用本类更新方法
      this.updateUser(values);

    })
  }

  updateUser = async (values) => {
    const userId = untils.getStorage(USERID)
    const password = untils.getStorage(PASSWORD)

    try {
      //调用更新 api
      const res = await userService.update(userId, password, values)
      message.success('修改成功');
      this.setState({
        value: res.data.data
      })
    } catch (err) {
      if (err.message === undefined) {
        const errorMessage = '服务器出错啦，请耐心等待'
        this.props.authError(errorMessage)
      }
      if (!err.response) {
        this.props.authError(err);
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        this.props.authError(errorMessage)
      }
      // 修改不成功
      if (err.response.status === 400 || err.response.status === 404) {
        const errorMessage = err.response.status
        message.error(errorMessage)
      }
    }
  }

  componentDidMount(){
    console.log(untils.getStorage(USERID))
    const userid = untils.getStorage(USERID)
    axios.post(getUerInfo_URL,untils.serialize({userid}),{
      headers: headers
    })
      .then((res) => {
        console.log(res.data)
        this.setState({
          value: res.data.data
        })
      })
      .catch((err) => {

      })
  }

  render() {
    const {form} = this.props
    const {value} = this.state
    
    const {getFieldDecorator} = form;//字段
    const username = value ? value.username : ''
    const identityCard = value ? value.identityCard : ''
    const age = value ? value.age : ''
    const gender = value ? (value.gender === 1 ? '男' : '女') : ''
    const phone = value ? value.phone : ''

    return (
        <div>
          <Panel>
            <Panel.Header type="light">
              <div style={{marginTop: 20, paddingTop: 15}}>
                <Breadcrumb>
                  <Breadcrumb.Item>主页</Breadcrumb.Item>
                  <Breadcrumb.Item>个人信息</Breadcrumb.Item>
                </Breadcrumb>
                <h2>个人信息</h2>
                <p>展示用户个人信息</p>
                <Divider style={{marginTop: 10, marginBottom: -10}} />
              </div>
            </Panel.Header>
            <Panel.Body type="light">
              <div style={{paddingLeft: 20, marginTop: 20, marginBottom: 20}}>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                  <FormItem label="用户名">
                    {getFieldDecorator('username', {
                      initialValue: username
                    })(
                      <Input type="text" />
                    )}
                  </FormItem>
                  <FormItem label="身份证号">
                    {getFieldDecorator('identityCard', {
                      rules: [{
                        message: '请输入身份号'
                      }, {
                        max: 18,
                        min: 1,
                        message: '身份号不能超过18位'
                      }],
                      initialValue: identityCard
                    })(
                      <Input type="text"/>
                    )}
                  </FormItem>
                  <FormItem label="年龄">
                    {getFieldDecorator('age', {
                      rules: [{
                        required: true,
                        message: '请输入年龄'
                      }, ],
                      initialValue: age
                    })(
                      <Input type="text"/>
                    )}
                  </FormItem>
                  <FormItem label="性别">
                    {getFieldDecorator('gender', {
                      rules: [{
                        required: true,
                        message: '请输入性别'
                      }, {
                        max: 100,
                        min: 1,
                        message: '用户昵称不能超过100个字符'
                      }],
                      initialValue: gender
                    })(
                      <Input type="text"/>
                    )}
                  </FormItem>
                  <FormItem label="电话">
                    {getFieldDecorator('phone', {
                      rules: [{
                        required: true,
                        message: '请输入电话'
                      }, {
                        max: 11,
                        min: 1,
                        message: '用户昵称不能超过11个字符'
                      }],
                      initialValue: phone
                    })(
                      <Input type="text"/>
                    )}
                  </FormItem>
                  <Button
                        type="primary"
                        htmlType="submit"
                      >
                        保存
                      </Button>
                </Form>
              </div>
            </Panel.Body>
          </Panel>
        </div>
    )
  }

}
