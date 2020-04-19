<template>
  <div class="total">
    <div class="total-option">
      <div class="block">
        <i class="el-icon-location-information"></i>
        <el-cascader v-model="totalInfo"
                     :options="options"
                     :props="{ expandTrigger: 'hover' }"
                     @change="getData"></el-cascader>
      </div>
      <!-- <div class="block">
        <i class="el-icon-location-information"></i>
        <el-cascader v-model="totalInfo"
                     :options="options"
                     :props="{ expandTrigger: 'hover',value:'value', label: 'value',
        children: 'children' }"
                     @change="getData"></el-cascader>
      </div> -->
      <el-breadcrumb separator="/"
                     class="bread-crumb">
        <el-breadcrumb-item :to="{ path: '/' }"> Home </el-breadcrumb-item>
        <el-breadcrumb-item v-show="park_id"
                            v-model="park_id">{{park_id}}</el-breadcrumb-item>
        <el-breadcrumb-item v-model="vehicle_id">{{vehicle_id}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="echarts">
      <el-divider v-if="!park_id"
                  content-position="left"><i class="el-icon-loading"></i> 选择你想查看的车辆数据. . .</el-divider>
      <div v-else>
        <el-tabs v-model="activeName">
          <el-tab-pane label="week"
                       name="week">
          </el-tab-pane>
          <el-tab-pane label="month"
                       name="month">
          </el-tab-pane>
          <el-tab-pane label="quarter"
                       name="quarter">
          </el-tab-pane>
          <el-tab-pane label="year"
                       name="year">
          </el-tab-pane>
        </el-tabs>
        <totalChart></totalChart>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../util/msgbus'
import totalChart from './totalChart'
export default {
  components: { totalChart },
  data () {
    return {
      isShow: true,
      activeName: 'week',
      totalInfo: [],
      park_id: '',
      vehicle_id: '',
      len: [],
      options: [],
      optionProps: {
        value: 'park_id',
        label: 'value',
        children: 'children'
      }
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {
    options () {
      return this.options
    },
    totalInfo () {
      return this.totalInfo
    },
    allData (e) {
      return this.allData
    },
    activeName (value) {
      this.getData(value)
    }
  },
  // 方法
  methods: {
    isdisply () {
      this.isShow = false
      console.log(this.isShow)
    },
    getLIst () {
      let that = this
      this.axios
        .get(
          '/api/vehicle/draw-list',
          {},
          {
            useLoading: true
          }
        )
        .then(function (data) {
          // console.log(data)
          // that.options = data.datas
          for (let i = 0; i < data.datas.length; i++) {
            that.len[i] = data.datas[i].children.length
            for (let j = 0; j < that.len[i]; j++) {
              that.options.push(
                {
                  value: data.datas[i].park_id,
                  label: data.datas[i].park_id,
                  children: [
                    {
                      value: data.datas[i].children[j],
                      label: data.datas[i].children[j].value
                    }
                  ]
                }
              )
            }
          }
          console.log(that.options)
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    getData () {
      let that = this
      console.log(that.totalInfo)
      that.park_id = that.totalInfo[0]
      that.vehicle_id = that.totalInfo[1].value
      that.axios
        .post(
          '/api/vehicle/dailydata',
          { 'vehicle_id': that.vehicle_id, 'park_id': that.park_id, 'interval': that.activeName },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          console.log(data)
          bus.$emit('allData', data.datas)
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getLIst()
    this.getData()
  }
}
</script>
<style scoped>
.total-option {
  display: flex;
  flex-direction: row;
  text-align: center;
  line-height: 40px;
  margin: 0 20px;
}
.bread-crumb {
  text-align: center;
  line-height: 40px;
  margin: 0 20px;
}
</style>
