<template>
  <div class="left main-sidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu class="el-menu-vertical-demo"
                 router
                 unique-opened
                 background-color="#0747a6"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-submenu v-for="item in menu"
                      :index="item.id"
                      :key="item.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span v-text="item.name"></span>
            </template>
            <el-menu-item-group class="over-hide"
                                v-for="sub in item.sub"
                                :key="sub.componentName">
              <el-menu-item :index="sub.componentName"
                            v-text="sub.name">
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.over-hide {
  overflow: hidden;
}
</style>

<script>
import menu from '@/config/menu-config'

export default {
  data () {
    return {
      menu: menu
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.over-hide {
  overflow: hidden;
}
</style>
