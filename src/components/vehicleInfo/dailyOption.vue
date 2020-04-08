<template>
  <div class="header">
    <div class="nav-search">
      <i class="el-icon-location-information"></i>
      <el-select v-model="vehicle_id"
                 placeholder="请选择车辆"
                 @change="getVehicle_id()">
        <el-option v-for="item in options"
                   :key="item.index"
                   :label="item.label"
                   :value="item">
        </el-option>
      </el-select>
    </div>
    <el-breadcrumb separator="/"
                   class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/' }"> Home </el-breadcrumb-item>
      <el-breadcrumb-item v-model="vehicle_item"
                          v-text="vehicle_item"></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import bus from '../util/msgbus'
export default {
  components: {},
  data () {
    return {
      arr: [],
      options: [],
      vehicle_id: ''
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
          '/api/vehicle/draw-list',
          {},
          {
            useLoading: true
          }
        )
        .then(function (data) {
          console.log(data.datas)
          bus.$emit('vehicle_park', data.datas)
          for (let i = 0; i < data.datas.length; i++) {
            for (let j = 0; j < data.datas[i].children.length; j++) {
              that.arr.push(data.datas[i].children[j].value)
            }
          }
          // console.log(that.arr)
          let vehicleArr = Array.from(new Set(that.arr))
          that.$emit('vehicleArr', vehicleArr)
          that.options = vehicleArr
          // console.log(that.options)
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    getVehicle_id () {
      let that = this
      console.log(that.vehicle_id)
      that.openFullScreen(500)
      that.axios
        .post(
          '/api/vehicle/daily',
          {
            'vehicle_id': that.vehicle_id
          },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          // console.log(data)
          let dailyData = data.datas[0]
          that.$emit('change-vehicle', dailyData)
          that.dailyData = data.daily[0]
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
