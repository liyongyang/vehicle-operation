<template>
  <div class='apage'>
    <div id="myChart1"
         style="width: 1200px;height: 1000px;">
    </div>
    <div class="row col-xs-12 col-md-6 col-lg-6 col-xl-3"
         v-for="(item, key) in dailyData"
         :index="item.id"
         :key="item.id">
      <div class="card-box bg-success">
        <h4 class="text-white text m-b-20"
            v-text="key"></h4>
        <h3 class="text-white"
            v-text="item">
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  components: {},
  data () {
    return {
      dailyData: []
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {
    getData () {
      let that = this
      // that.openFullScreen(500)
      that.axios
        .post(
          '/api/vehicle/totaldata',
          {
            'vehicle_id': 'arts16_1'
          },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          console.log(data)
          // for (let i = 0; i < 4; i++) {
          //   that.dailyData.push(data.datas)
          // }
          // that.dailyData = data.datas[0]
          // console.log(that.dailyData)
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    drawPie1 (id) {
      var item1 = {
        color: '#F54F4A'
      }
      var item2 = {
        color: '#FF8C75'
      }
      var item3 = {
        color: '#FFB499'
      }
      var data = [
        // {
        //   name: 'arts16_2',
        //   children: [
        {
          name: '场地1',
          itemStyle: item1,
          children: [
            {
              name: 'run_time',
              value: 10,
              children: [{
                name: 'Cousin Jack',
                value: 10
              }]
            },
            {
              name: 'run_mileage',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'E_stop',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'ES_time',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'takeover',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'takeover_time',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'bag_size',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            }
          ]
        },
        {
          name: '场地2',
          itemStyle: item2,
          children: [
            {
              name: 'run_time',
              value: 10,
              children: [{
                name: 'Cousin Jack',
                value: 10
              }]
            },
            {
              name: 'run_mileage',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'E_stop',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'ES_time',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'takeover',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'takeover_time',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'bag_size',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            }
          ]
        },
        {
          name: '场地3',
          itemStyle: item3,
          children: [
            {
              name: 'run_time',
              value: 10,
              children: [{
                name: 'Cousin Jack',
                value: 10
              }]
            },
            {
              name: 'run_mileage',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'E_stop',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'ES_time',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'takeover',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'takeover_time',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            },
            {
              name: 'bag_size',
              value: 10,
              children: [{
                name: 'Me',
                value: 10
              }]
            }
          ]
        }
        // ]
        // }
      ]
      this.mychart1 = echarts.init(document.getElementById('myChart1'))
      this.mychart1.setOption({
        series: {
          type: 'sunburst',
          // highlightPolicy: 'ancestor',
          data: data,
          radius: [0, '90%'],
          label: {
            rotate: 'radial'
          }
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getData()
    this.$nextTick(function () {
      this.drawPie1('myChart1')
    })
  }
}
</script>
<style scoped>
@import "../assets/style.css";
</style>
