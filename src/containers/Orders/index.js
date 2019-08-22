import React from 'react';
import { connect } from 'react-redux';
import {DataGrid, GridColumn} from 'rc-easyui'
import Panel from '@/components/Panel';
import {
  Button,
  Layout,
  message
} from 'antd';
import {
  getSelectedTickets
} from '@/actions/index';
import SelectorHeader from './SelectorHeader';
import { dateFormat,  getStorage, serialize} from '../../utils';
import axios from 'axios'
import {API_URL,headers, USERNAME} from '../../constants'

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
export default class Orders extends React.Component {

  state={
    data: '',
    show: false
  }


  onSelectorChange =async (value) => {
    console.log(value)
    await this.props.loadOrders(value)
  }

  renderDetail({ row }) {
    const buyTickets = (row) => {
      row.yupiao = row.yupiao -1
      const userId = getStorage('userid')
      const trainId = row.trainId
      const seatId = row.trainSeat[0].seatId
      const price = row.price
      const startStation = row.startStation
      const arriveStation = row.arriveStation
      const url = `${API_URL}/insertOrder`
      axios.post(url,serialize({
        userId,
        trainId,
        seatId,
        price,
        startStation,
        arriveStation
      }),{
        headers: headers
      })
        .then((res) => {
          if(res.data.code === 100 && res.data.data === 1){
            message.success('创建订单成功')
          }
        })
        .catch((err) => {
          message.error('创建订单失败')
        })

      
    }
    return (
      <div className="item f-row">
        <div style={{display: 'flex'}}>
          <div style={{margin: "2px 10px"}}>距离: {row.totalDistance}</div>
          <div style={{margin: "2px 10px"}}>票价: {row.price}</div>
          <div style={{margin: "2px 10px"}}>余票: {row.yupiao}</div>
          <div>
            <Button onClick={() => buyTickets(row)}>购票</Button>
          </div>
        </div>
      </div>
    )
  }

  

  translateData (tt){
    if(tt[0]){
      const data = new Array(tt.length)
      for(let i = 0; i < tt.length; i++){
        data[i] = {
          trainId: tt[i].trainId,
          trainName: tt[i].trainName,
          startStation: tt[i].startStation,
          arriveStation: tt[i].arriveStation,
          startTime: dateFormat(new Date(tt[i].startTime), 'yyyy-MM-dd hh:ss'),
          arriveTime: dateFormat(new Date(tt[i].arriveTime),'yyyy-MM-dd hh:ss'),
          price: tt[i].totalDistance.toString(),
          yupiao: tt[i].trainSeat.length,
          startStationId: tt[i].startStationId,
          arriveStationId: tt[i].arriveStationId,
          trainSeat: tt[i].trainSeat,
          totalDistance: tt[i].totalDistance
        }
      }
      return data
    }
    return []
  }

  render() {

  const tt = this.props.orders

  console.log(this.translateData(tt))
    

    return (
      <Layout.Content>
        <Panel minus>
          <SelectorHeader
            handleSelectorChange={this.onSelectorChange}
          />
          
          <Panel.Body type="light">
            <DataGrid data={this.translateData(tt)} renderDetail={this.renderDetail} onClickRow={this.clickRow} style={{ height: 350 }}>
              <GridColumn expander width="30px"></GridColumn>
              <GridColumn field="trainName" title="车次" align="center"></GridColumn>
              <GridColumn field="startStation" title="出发地" align="center"></GridColumn>
              <GridColumn field="arriveStation" title="目的地" align="center"></GridColumn>
              <GridColumn field="startTime" title="发车时间" align="center"></GridColumn>
              <GridColumn field="arriveTime" title="到达时间" align="center"></GridColumn>
            </DataGrid>
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
