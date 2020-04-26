<template>
  <el-tabs v-model="activeName"
           type="card"
           @tab-click="handleClick">
    <el-tab-pane label="急停&接管"
                 name="E_stop">
      <TEform :formData='formData'></TEform>
    </el-tab-pane>
    <el-tab-pane label="日检表"
                 name="checkData">
      <checkPage></checkPage>
    </el-tab-pane>
    <el-tab-pane label="车辆检查日志"
                 name="checkLog">
      <checkLog></checkLog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import TEform from './formInfo/TEform'
import checkPage from './formInfo/checkPage'
import checkLog from './formInfo/checkLog'
export default {
  components: {
    TEform, checkPage, checkLog
  },
  data () {
    return {
      activeName: 'E_stop',
      formData: [[]]
    }
  },
  // 监听
  computed: {
  },
  // 监控
  watch: {
    formData (e) {
      return this.formData
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // this.$nextTick(function () {
    //   this.getData()
    // })
  }
}
</script>
