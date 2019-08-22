import React from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import {getStaticData_URL, headers} from '../../constants'

export default class OrderCharts extends React.Component {
  state={
    datas: []
  }

  componentWillMount(){
    axios.post(getStaticData_URL,{},{
      headers: headers
    })
      .then((res) => {
        console.log(res.data.data)
        this.setState({
          datas: res.data.data
        })
      })
      .catch((err)=> {

      })
  }

  getOption = () => {
    const {datas} = this.state
    return {
      title : {
        text: '出行情况统计',
        subtext: '当年',
        x:'center'
      },
      tooltip : {
        trigger: 'axis'
        //formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['出行次数']
      },
      toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
      ],
      yAxis : [
        {
            type : 'value'
        }
      ],
      series : [
        {
        name: '出行情况',
        type: 'bar',
        data: datas,
        markPoint : {
          data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
          ]
        },
        markLine : {
          data : [
              {type : 'average', name: '平均值'}
          ]
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
