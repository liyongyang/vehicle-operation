<template>
  <div class="total-option">
    <div class="block">
      <i class="el-icon-location-information"></i>
      <el-cascader v-model="totalInfo"
                   :options="options"
                   :props="{ expandTrigger: 'hover' }"
                   @change="getData"></el-cascader>
    </div>
    <el-breadcrumb separator="/"
                   class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/' }"> Home </el-breadcrumb-item>
      <el-breadcrumb-item v-show="park_id"
                          v-model="park_id">{{park_id}}</el-breadcrumb-item>
      <el-breadcrumb-item v-model="vehicle_id">{{vehicle_id}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import bus from '../util/msgbus'
export default {
  components: {},
  data () {
    return {
      totalInfo: [],
      park_id: '',
      vehicle_id: '',
      options: []
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
          for (let i = 0; i < data.datas.length; i++) {
            for (let j = 0; j < data.datas[i].children.length; i++) {
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
      that.park_id = that.totalInfo[0]
      that.vehicle_id = that.totalInfo[1].value
      console.log(that.vehicle_id)
      this.axios
        .post(
          '/api/vehicle/total',
          { vehicle_id: that.vehicle_id, park_id: that.park_id, interval: 'year' },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          console.log(data)
          bus.$emit('totalInfo', data.datas)
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
      this.axios
        .post(
          '/api/vehicle/daily',
          { 'vehicle_id': this.vehicle_id },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          bus.$emit('recentInfo', data.datas)
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
