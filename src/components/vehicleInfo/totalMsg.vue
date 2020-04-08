<template>
  <div class="total-mesage">
    <Option></Option>
    <Aechart></Aechart>
  </div>
</template>

<script>
import Aechart from './Aechart'
import Option from './totalOption'
export default {
  components: { Aechart, Option },
  data () {
    return {}
  },
  // 监听
  computed: {},
  // 监控
  watch: {
  },
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
@import "../../assets/style.css";
</style>
