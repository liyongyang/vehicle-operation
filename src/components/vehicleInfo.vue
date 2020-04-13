<template>
  <div class="daily-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="total"
                   name="first">
        <dailyMsg></dailyMsg>
      </el-tab-pane>
      <el-tab-pane label="daily"
                   name="second">
        <totalMsg></totalMsg>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dailyMsg from './vehicleInfo/dailyMsg'
import totalMsg from './vehicleInfo/totalMsg'
export default {
  components: {
    dailyMsg, totalMsg
  },
  data () {
    return {
      vehicle_id: '',
      activeName: 'first'
    }
  },
  // 监听
  computed: {
  },
  // 监控
  watch: {},
  // 方法
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
<style scoped>
@import "../assets/style.css";
.active {
  margin-right: 24px;
}
</style>
