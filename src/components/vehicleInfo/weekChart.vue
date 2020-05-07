<template>
  <div class="dailyMsg container-fluid">
    <div style="height:200px">
      <el-card class="box-card"
               style="width: 230px;height:100px;float:left;margin:5px 10px"
               v-for="(item,index) in single"
               :key="item.index">
        <div class="topic">
          <img :src="'../../../static/icons/'+index+'.png'"
               alt=""
               srcset="" />
          <div>
            <h5>T_{{index}}:</h5>
            <strong>{{item}}</strong>
          </div>
        </div>
      </el-card>
    </div>
    <div id="myChart1"
         style="width: 2000px;height: 800px;"></div>
  </div>
</template>

<script>
// import bus from '../util/msgbus'
import echarts from 'echarts'
export default {
  props: {
    'single': {},
    'arrayData': Array
  },
  components: {},
  data () {
    return {
      dayData: [],
      run_time: [],
      run_mileage: [],
      jira: [],
      bag_size: [],
      takeover: [],
      E_stop: [],
      //
      fault_counts: [],
      accident_counts: []
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {
    arrayData () {
      if (this.dayData) {
        Object.assign(this.$data, this.$options.data())
        for (let i = 0; i < this.arrayData.length; i++) {
          this.dayData.push(this.arrayData[i].day)
          this.run_time.push(this.arrayData[i].run_time)
          this.run_mileage.push(this.arrayData[i].run_mileage)
          this.jira.push(this.arrayData[i].jira)
          this.takeover.push(this.arrayData[i].takeover)
          this.E_stop.push(this.arrayData[i].E_stop)
          this.bag_size.push(this.arrayData[i].bag_size)
          this.fault_counts.push(this.arrayData[i].fault_counts)
          this.accident_counts.push(this.arrayData[i].accident_counts)
        }
        console.log(this.bag_size)
      }
      this.drawPie1('myChart1')
    }
  },
  // 方法
  methods: {
    drawPie1 (id) {
      this.mychart1 = echarts.init(document.getElementById('myChart1'))
      this.mychart1.setOption({
        title: '',
        grid: {
          left: 70,
          top: 50,
          right: 60,
          bottom: 30
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {// 坐标轴指示器，坐标轴触发有效
            type: 'line'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        /* 图例说明 */
        legend: {
          // 图例排项 vertical-"竖向"; horizontal-"横向"
          orient: 'horizontal',
          // 图例组件离容器左侧的距离
          left: 500,
          top: 0,
          // 图例文字的样式
          textStyle: {
            color: '#000000'
          },
          // 与series中每个name对应
          data: ['运营时间', '运营里程', '接管次数', '急停次数', 'jira', 'bag_size']
        },
        xAxis: {
          data: this.dayData
        },
        yAxis: {},
        /// 用于添加框选缩放功能
        toolbox: {
          show: true,
          feature:
          {
            dataZoom:
            {
              realtime: false,
              yAxisIndex: 'none'
            },
            restore: {}
          }
        },
        dataZoom:
          [
            { type: 'inside' }, { type: 'slider' }
          ],
        series: [
          {

            name: '运营时间',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: '#3300CC',
            data: this.run_time,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '运营里程',
            type: 'line',
            borderWidth: 1,
            color: '#009966',
            data: this.run_mileage,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '接管次数',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: '#FF6666',
            data: this.takeover,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '急停次数',
            type: 'line',
            borderWidth: 1,
            color: '#FF00FF',
            data: this.E_stop,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: 'jira',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: '#CC6600',
            data: this.jira
          },
          {
            name: 'bag_size',
            type: 'line',
            borderWidth: 1,
            color: '#6600CC',
            data: this.bag_size
          }
        ]
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // console.log(this.allData)
  }
}
</script>
<style scoped>
.topic {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.topic > img {
  width: 45px;
  height: 45px;
}
</style>
