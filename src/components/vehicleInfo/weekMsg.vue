<template>
  <div class="daily-msg">
    <!-- <div class="header">
      <div class="nav-search">
        <i class="el-icon-location-information"></i>
        <el-select v-model="vehicle_id"
                   placeholder="请选择车辆"
                   @change="getVehicle_id()">
          <el-option v-for="item in options"
                     :key="item.index"
                     :label="item.value"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-breadcrumb separator="/"
                     class="bread-crumb">
        <el-breadcrumb-item :to="{ path: '/' }"> Home </el-breadcrumb-item>
        <el-breadcrumb-item v-model="vehicle_item"
                            v-text="vehicle_item"></el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <weekChart :dailyData=dailyData></weekChart>
  </div>
</template>

<script>
// import bus from '../util/msgbus'
import weekChart from './weekChart'
export default {
  components: { weekChart },
  data () {
    return {
      arr: [],
      len: [],
      options: [],
      vehicle_id: '',
      dailyData: []
    }
  },
  // 监听
  computed: {
    vehicle_item: function () {
      return this.vehicle_id
    }
  },
  // 监控
  watch: {
    options () {
      return this.options
    }
  },
  // 方法
  methods: {
    getLIst () {
      let that = this
      this.axios
        .get(
          '/api/vehicle/draw-list-vehicle',
          {},
          {
            useLoading: true
          }
        )
        .then(function (data) {
          that.options = data.datas
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    openFullScreen (time) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      setTimeout(() => loading.close(), time)
    },
    getVehicle_id () {
      let that = this
      that.openFullScreen(500)
      that.axios
        .post(
          '/api/vehicle/totaldata',
          {
            'vehicle_id': that.vehicle_id
          },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          that.dailyData = data.datas
          // bus.$emit('dailyData', that.dailyData)
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
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getLIst()
  }
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  padding-bottom: 18px;
  text-align: center;
}
.bread-crumb {
  text-align: center;
  line-height: 40px;
  margin: 0 20px;
}
</style>
