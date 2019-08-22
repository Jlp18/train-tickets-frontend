import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '@/components/Panel';
import {
  Button,
  Layout,
  Breadcrumb,
  Divider,
  Table,
  Form
} from 'antd';
import {
  getSelectedTickets
} from '@/actions/index';
import SelectorHeader from './SelectorHeader';
import {dataFormat} from '@/utils/index'
import { type } from 'os';
import { dateFormat } from '../../utils';

@connect(
  state => ({
    orders: state.orders.orders,
    isFetching: state.orders.isFetchingOrders
  }),
  dispatch => ({
    loadOrders: (data) => {
      dispatch(getSelectedTickets(data))
    }
  })
)
export default class Goods extends React.Component {

  state={
    data: '',
    show: false
  }


  onSelectorChange =async (value) => {
    console.log(value)
    await this.props.loadOrders(value)
  }


  handleSubmit = () =>{
    
  }


  render() {

    

    return (
      <Layout.Content>
        <Panel minus>
          <SelectorHeader
            handleSelectorChange={this.onSelectorChange}
          />

        </Panel>
      </Layout.Content>
    )
  }
}
