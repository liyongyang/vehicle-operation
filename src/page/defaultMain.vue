<template>
  <div class="default-main">
    <div class="demo-image__lazy">
      <el-image class="banner"
                :src="src"></el-image>
    </div>
    <!-- <div class="block">
      <span class="demonstration">默认 Hover 指示器触发</span>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4"
                          :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'defaultMain',
  components: {},
  data () {
    return {
      src: require('../../static/images/banner.jpg')
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.banner {
  width: 100%;
  height: 1050px;
}
</style>
