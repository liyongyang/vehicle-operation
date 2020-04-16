<template>
  <el-container>
    <el-header class="header">
      <Vheader></Vheader>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <navmenu></navmenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from './../components/NavMenu'
import Header from './../components/header'
export default {
  name: 'App',
  components: {
    navmenu: NavMenu,
    Vheader: Header
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: rgb(7, 71, 166);
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: rgb(7, 71, 166);
  line-height: 200px;
}

.el-main {
  height: 1100px;
  color: #333;
  background-color: #f6f7f6;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
