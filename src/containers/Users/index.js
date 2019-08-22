import React from 'react';
import {DataGrid, GridColumn} from 'rc-easyui'
import Panel from '../../components/Panel';
import {
  Layout,
  Breadcrumb,
  Spin
} from 'antd';
import axios from 'axios'
import * as untils from '../../utils'
import {headers, USERID, getOrders_URL} from '../../constants'

export default class Users extends React.Component {
  state = {
    gridData: []
  }

  componentDidMount() {
    const userId = untils.getStorage(USERID)
    axios.post(getOrders_URL,untils.serialize({
      userId
    }),{
      headers:headers
    })
      .then((result) => {
        if(result.data.code === 100){
          console.log(result.data.data)
          let TempData = result.data.data
          for(let i = 0; i < TempData.length; i++){
            TempData[i].createTime = untils.dateFormat(new Date(TempData[i].createTime), 'yyyy-MM-dd hh:ss')
          }
          this.setState({
            gridData: TempData
          })
        }
      })
      .catch((error) => {
        //获取失败
      })
  }

  render() {
    const {gridData} = this.state

    return (
      <Layout.Content>
        <Panel minus>
          <Panel.Header type="light">
            <Breadcrumb>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>我的订单</Breadcrumb.Item>
            </Breadcrumb>
            <h2>我的订单</h2>
            <p>显示用户已经创建的订单信息</p>
          </Panel.Header>
          <Panel.Body type="light">
            <DataGrid data={gridData} style={{ height: 350 }}>
              <GridColumn field="trainName" title="车次" align="center"></GridColumn>
              <GridColumn field="startStation" title="出发地" align="center"></GridColumn>
              <GridColumn field="arriveStation" title="目的地" align="center"></GridColumn>
              <GridColumn field="carriage" title="车厢" align="center"></GridColumn>
              <GridColumn field="seatLocation" title="座位" align="center"></GridColumn>
              <GridColumn field="price" title="价格" align="center"></GridColumn>
              <GridColumn field="createTime" title="创建时间" align="center"></GridColumn>
            </DataGrid>
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
