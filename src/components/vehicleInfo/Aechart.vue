<template>
  <div class="echarts">
    <el-divider v-if="!isShow"
                content-position="left"><i class="el-icon-loading"></i> 选择你想查看的车辆数据. . .</el-divider>
    <div v-bind:style="{display:!isShow ? 'block':'none'}">
      <el-tabs>
        <el-tab-pane label="最近数据波动">
          <recEchart></recEchart>
        </el-tab-pane>
        <el-tab-pane label="运营统计">
          <div id="myChart1"
               :style="{width: '2100px', height: '800px'}"></div>
        </el-tab-pane>
        <el-tab-pane label="接管次数 & 急停次数">
          <div id="myChart2"
               style="width: 2100px;height: 800px;"></div>
        </el-tab-pane>
        <el-tab-pane label="接管时间 & 急停时间">
          <div id="myChart3"
               style="width: 2100px;height: 800px;"></div>
        </el-tab-pane>
        <el-tab-pane label="more">
          <div id="main"
               style="width: 600px;height: 400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import bus from '../util/msgbus'
import echarts from 'echarts'
import recEchart from './recEchart'
export default {
  components: {
    recEchart
  },
  name: 'echarts',
  data () {
    return {
      isShow: false,
      activeNames: ['2'],
      charts: '',
      mychart1: '',
      mychart2: '',
      mychart3: '',
      dayData: [],
      total_running_time: [],
      total_running_length: [],
      total_jira_commit_counts: [],
      total_take_over_counts: [],
      total_emergency_stop_counts: [],
      total_take_over_duration: [],
      total_emergency_stop_duration: [],
      total_fault_counts: [],
      total_accident_counts: [],
      opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      opinionData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  },
  // 监听
  computed: {
  },
  // 监控
  watch: {
    totalInfo (e) {
      return this.totalInfo
    }
  },
  methods: {
    isdisply () {
      this.isShow = true
      console.log('aaa')
    },
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.opinion
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData
          }
        ]
      })
    },
    drawPie1 (id) {
      // console.log(this.dayData)
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
          data: ['运营时间', '运营里程', '接管次数', '急停次数', '接管时间', '急停时间']
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
            color: 'rgb(7, 71, 166)',
            data: this.total_running_time,
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
            color: 'rgba(255,0,5)',
            data: this.total_running_length,
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
            color: '#3300CC',
            data: this.total_take_over_counts
          },
          {
            name: '急停次数',
            type: 'line',
            borderWidth: 1,
            color: '#009966',
            data: this.total_emergency_stop_counts
          },
          {
            name: '接管时间',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: '#FF6666',
            data: this.total_take_over_duration
          },
          {
            name: '急停时间',
            type: 'line',
            borderWidth: 1,
            color: '#FFCC33',
            data: this.total_emergency_stop_duration
          }
        ]
      })
    },
    drawPie2 (id) {
      // console.log(this.dayData)
      this.mychart1 = echarts.init(document.getElementById('myChart2'))
      this.mychart1.setOption({
        title: '',
        tooltip: {},
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
            name: '接管次数',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: 'rgb(7, 71, 166)',
            data: this.total_take_over_counts
          },
          {
            name: '急停次数',
            type: 'line',
            borderWidth: 1,
            color: 'rgba(255,0,5)',
            data: this.total_emergency_stop_counts
          }
        ]
      })
    },
    drawPie3 (id) {
      // console.log(this.dayData)
      this.mychart1 = echarts.init(document.getElementById('myChart3'))
      this.mychart1.setOption({
        title: '',
        tooltip: {},
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

            name: '接管时间',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: 'rgb(7, 71, 166)',
            data: this.total_take_over_duration
          },
          {
            name: '急停时间',
            type: 'line',
            borderWidth: 1,
            color: 'rgba(255,0,5)',
            data: this.total_emergency_stop_duration
          }
        ]
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    bus.$on('totalInfo', res => {
      this.totalInfo = res.total
      console.log(this.totalInfo)
      for (let i = 0; i < res.total.length; i++) {
        this.$nextTick(function () {
          this.dayData[i] = res.total[i].day
          this.total_running_time[i] = res.total[i].total_running_time
          this.total_running_length[i] = res.total[i].total_running_length
          this.total_jira_commit_counts[i] = res.total[i].total_jira_commit_counts
          this.total_take_over_counts[i] = res.total[i].total_take_over_counts
          this.total_emergency_stop_counts[i] = res.total[i].total_emergency_stop_counts
          this.total_take_over_duration[i] = res.total[i].total_take_over_duration
          this.total_emergency_stop_duration[i] = res.total[i].total_emergency_stop_duration
          this.total_fault_counts[i] = res.total[i].total_fault_counts
          this.total_accident_counts[i] = res.total[i].total_accident_counts
        })
      }
      // console.log(this.total_running_length)
      this.$nextTick(function () {
        this.drawPie('main')
        this.drawPie1('myChart1')
        this.drawPie2('myChart2')
        this.drawPie3('myChart3')
        this.isdisply()
      })
    })
  }
}
</script>
<style scoped>
</style>
