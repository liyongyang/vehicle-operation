<template>
  <div class='recentInfo row'>
    <div id="rec1"
         :style="{width: '2100px', height: '800px'}"></div>
  </div>
</template>

<script>
import bus from '../util/msgbus'
import echarts from 'echarts'
export default {
  components: {},
  data () {
    return {
      rec_day: [],
      rec_run_time: [],
      rec_run_mile: [],
      rec_es_count: [],
      rec_es_dur: [],
      rec_to_count: [],
      rec_to_dur: [],
      rec_real_dur: [],
      mychart1: ''
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {
    drawPie1 (id) {
      this.mychart1 = echarts.init(document.getElementById(id))
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
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
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
          data: ['运营时间', '运营里程', '急停次数', '急停时间', '接管次数', '接管时间']
        },
        toolbox: {
          show: true
        },
        calculable: true,
        xAxis: {
          data: this.rec_day
        },
        yAxis: {},
        series: [
          {
            name: '运营时间',
            type: 'bar',
            barWidth: '12%',
            color: '#3300CC',
            data: this.rec_run_time,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '运营里程',
            type: 'bar',
            barWidth: '12%',
            color: '#009966',
            data: this.rec_run_mile,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '急停次数',
            type: 'bar',
            barWidth: '12%',
            color: '#FF6666',
            data: this.rec_es_count,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '急停时间',
            type: 'bar',
            barWidth: '12%',
            color: '#FF00FF',
            data: this.rec_es_dur,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '接管次数',
            type: 'bar',
            barWidth: '12%',
            color: '#CC6600',
            data: this.rec_to_count,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '接管时间',
            type: 'bar',
            barWidth: '12%',
            color: '#6600CC',
            data: this.rec_to_dur,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
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
    bus.$on('recentInfo', res => {
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        this.$nextTick(function () {
          this.rec_day[i] = res[i].day
          this.rec_run_time[i] = res[i].run_time
          this.rec_run_mile[i] = res[i].run_mileage
          this.rec_es_count[i] = res[i].E_stop
          this.rec_es_dur[i] = res[i].ES_time
          this.rec_to_count[i] = res[i].takeover
          this.rec_to_dur[i] = res[i].takeover_time
        })
      }
      // console.log(this.rec_day)
      this.$nextTick(function () {
        this.drawPie1('rec1')
      })
    })
  }
}
</script>
<style scoped>
</style>
