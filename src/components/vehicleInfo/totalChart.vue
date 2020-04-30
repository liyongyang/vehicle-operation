<template>
  <div class="echarts">
    <!-- <el-card v-for="(item, key) in oneData"
             :index="item.index"
             :key="item.index">
      <h4 v-text="key"></h4>
      <h2 v-text="item">
      </h2>
    </el-card> -->
    <div id="myChart1"
         style="width: 1600px;height: 600px;"></div>
    <!-- <el-table :data="oneData"
              style="width: 100%">
      <el-table-column prop="vehicle_id"
                       label="vehicle_id"
                       width="180">
      </el-table-column>
      <el-table-column prop="run_mileage"
                       label="run_mileage"
                       width="180">
      </el-table-column>
      <el-table-column prop="bag_size"
                       label="bag_size">
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import bus from '../util/msgbus'
import echarts from 'echarts'
export default {
  // props: {
  //   'allData': Array
  // },
  components: {
  },
  name: 'echarts',
  data () {
    return {
      isShow: false,
      activeName: 'week',
      park_id: '',
      vehicle_id: '',
      allData: [],
      oneData: [],
      dayData: [],
      total_running_time: [],
      total_running_length: [],
      total_jira_commit_counts: [],
      total_take_over_counts: [],
      total_emergency_stop_counts: [],
      total_take_over_duration: [],
      total_emergency_stop_duration: [],
      total_fault_counts: [],
      total_accident_counts: []
    }
  },
  // 监听
  computed: {
  },
  // 监控
  watch: {
    allData (e) {
      this.dayData = []
      this.drawPie1('myChart1')
    }
  },
  methods: {
    isdisply () {
      this.isShow = true
    },
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
            color: '#3300CC',
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
            color: '#009966',
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
            color: '#FF6666',
            data: this.total_take_over_counts,
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
            data: this.total_emergency_stop_counts,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '接管时间',
            type: 'line',
            fontSize: 28,
            borderWidth: 1,
            color: '#CC6600',
            data: this.total_take_over_duration
          },
          {
            name: '急停时间',
            type: 'line',
            borderWidth: 1,
            color: '#6600CC',
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
    bus.$on('allData', res => {
      this.allData = res
      // for (let i = 0; i < this.allData[0].length; i++) {
      //   this.oneData.push(this.allData[0][i])
      // }
      // this.oneData = this.allData[0]
      // console.log(this.oneData)
      for (let i = 0; i < res.length; i++) {
        this.$nextTick(function () {
          this.dayData[i] = res[i].day
          this.total_running_time[i] = res[i].run_time
          this.total_running_length[i] = res[i].run_mileage
          this.total_jira_commit_counts[i] = res[i].jira
          this.total_take_over_counts[i] = res[i].takeover
          this.total_emergency_stop_counts[i] = res[i].E_stop
          this.total_take_over_duration[i] = res[i].takeover_time
          this.total_emergency_stop_duration[i] = res[i].ES_time
          this.total_fault_counts[i] = res[i].fault_counts
          this.total_accident_counts[i] = res[i].accident_counts
        })
      }
      // console.log(this.total_running_length)
      this.$nextTick(function () {
        this.drawPie1('myChart1')
      })
    })
  }
}
</script>
<style scoped>
</style>
