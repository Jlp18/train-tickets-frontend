import React from 'react';
import { connect } from 'react-redux';
import {
  Layout,
  Tabs,
  Row,
  Col
} from 'antd';
import OrderCharts from './OrderCharts';
import ConversionCharts from './ConversionCharts';


export default class Dashboard extends React.Component {

  render() {
    return (
      <Layout.Content style={{backgroundColor: '#f0f2f5'}}>
         <Row gutter={24}>
          <Col span={24}>
            <ConversionCharts />
          </Col>
        </Row>

        <Row gutter={24} style={{marginTop: '30px'}}>
          <Col span={24} style={{bakcground: '#fff'}}>
            <OrderCharts />
          </Col>
          
        </Row>
      </Layout.Content>
    )
  }
}

function toThousands (str) {
  if (!str) {
    return ''
  }

  return str.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
