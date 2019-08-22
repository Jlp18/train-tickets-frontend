import React from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import {
  getOrderCount_URL,
  getSelectCount_URL,
  headers
} from '../../constants'

export default class ConversionCharts extends React.Component {
  state={
    selectCount: 0,
    orderCount: 0
  }

  componentDidMount(){
    axios.post(getOrderCount_URL,{},{
      headers: headers
    })
      .then((res) => {
        if(res.data.code === 100) {
          this.setState({
            orderCount: res.data.data
          })
        }
      })
      .catch((err) => {
        //获取失败
      })


      axios.post(getSelectCount_URL,{},{
        headers: headers
      })
        .then((res) => {
          if(res.data.code === 100) {
            this.setState({
              selectCount: res.data.data
            })
          }
        })
        .catch((err) => {
          //获取失败
        })
  }

  getOption = () => {
    const {
      selectCount,
      orderCount
    } = this.state
    return {
      title : {
        text: '查询购买率',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['查询车票数','已完成订单']
      },
      series : [
        {
        name: '统计情况',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value: selectCount, name:'查询车票数'},
          {value: orderCount, name:'已完成订单'},
        ],
        itemStyle: {
          emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
        }
      ]
    }
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{
          height: 300,
          backgroundColor: '#fff',
          padding: '24px'
        }}
      />
    )
  }
}