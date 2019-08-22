import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@/components/Panel';
import {
  Breadcrumb,
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Divider,
  Input
} from 'antd';
import {DateBox} from 'rc-easyui'
import { ORDER_WAIT, ORDER_DISPATCHING, ORDER_FINISH, ORDER_REFUNDING } from '../../constants';

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
export default class SelectorHeader extends React.Component {
  static propTypes = {
    handleSelectorChange: PropTypes.func.isRequired
  }

  state={
    value: new Date
  }
  

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        return ;
      }
      let data = {
        startStation: values.start,
        arriveStation: values.end,
        chosedDate: this.formatDate(this.state.value)
      }
      console.log(data)

      this.props.handleSelectorChange(data)
    })
  }

  handleReset = () => {
    this.props.form.setFieldsValue({
      start: '',
      end: ''
    })
  }

  handleChange(value) {
    this.setState({ value: value })
  }

  formatDate(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    if(m >= 10){
      m = m;
    }else{
      m = '0' + m;
    }
    let d = date.getDate();
    if(d >= 10){
      d = d;
    }else{
      d = '0' + d;
    }
    return [y, m, d].join('-')
  }

  render() {
    const {
      form
    } = this.props

    const { getFieldDecorator } = form

    return (
      <div>
        <Panel.Header type="light">
          <div style={{marginTop: 20, paddingTop: 15}}>
            <Breadcrumb>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>车票查询</Breadcrumb.Item>
            </Breadcrumb>
            <h2>车票查询</h2>
            <p>展示一日内全部车票信息，组合查询车票信息</p>
            <Divider style={{marginTop: 10, marginBottom: -10}} />
          </div>
        </Panel.Header>

        <div>
          <div style={{display:'flex', marginTop: 20}}>
            <div style={{marginTop: 5, marginLeft:15}}>
              <DateBox value={this.state.value} onChange={this.handleChange.bind(this)}></DateBox>
            </div>
            <div>
              <Form className="form-search" onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                  <Col span={9}>
                    <FormItem label="出发地" style={{marginLeft: 10}}>
                      {getFieldDecorator('start',{
                        initialValue: ""
                      })(
                        <Input type="text" />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      className="form-flex-wrapper"
                      label="目的地"
                    >
                      {getFieldDecorator('end', {
                        initialValue: ""
                      })(
                        <Input type="text" />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={7} style={{textAlign: 'right', marginTop: 5}}>
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      搜索
                    </Button>
                    <Divider type="vertical"/>
                    <Button type="dashed" onClick={this.handleReset}>重置</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          
          
        </div>
      </div>
      
    )
  }
}
