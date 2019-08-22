import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Layout,
  Icon,
  Badge,
  Menu
} from 'antd'
import SidebarLogo from '@/components/SidebarLogo';

const {
  Sider
} = Layout
const {
  Item,
  SubMenu
} = Menu

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    wait: state.orders.wait,
    dispatching: state.orders.dispatching,
    refunding: state.orders.refunding
  })
)
export default class Sidebar extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    permission: PropTypes.bool.isRequired
  }

  state = {
    current: '0'
  }

  handleClick = (e) => {
    const key = e.key
    this.setState({
      current: key
    })
  }

  render() {
    const {
      adminId,
      permission,
      wait,
      dispatching,
      refunding,
      collapsed
    } = this.props

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <SidebarLogo />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={this.handleClick}
        >
          <Item key="0">
            <Link to="/orders">
              <Icon type="profile" />
              <span>车票查询</span>
            </Link>
          </Item>
          <Item key="1">
            <Link to="/users">
              <Icon type="dashboard" />
              <span>我的订单</span>
            </Link>
          </Item>
          <Item key="2">
            <Link to="/goods">
              <Icon type="table" />
              <span>个人信息</span>
            </Link>
          </Item>
          <Item key="8">
            <Link to="/dashboard">
              <Icon type="switcher" />
              <span>数据统计</span>
            </Link>
          </Item>
        </Menu>
      </Sider>
    )
  }
}
