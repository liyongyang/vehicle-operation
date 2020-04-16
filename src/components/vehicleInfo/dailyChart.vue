<template>
  <div class="dailyMsg container-fluid">
    <el-divider v-if="dailyData == ''"
                content-position="left"><i class="el-icon-loading"></i> 选择你想查看的车辆数据. . .</el-divider>
    <el-carousel :interval="8000"
                 height="850px"
                 v-else>
      <el-carousel-item v-for="items in dailyData"
                        :index="items.id"
                        :key="items.id"
                        class="box-card">
        <el-card v-for="(item, key) in items"
                 :index="item.id"
                 :key="item.id"
                 id="cardbox">
          <h4 class="text-top"
              v-text="key"></h4>
          <h2 class="text-val"
              v-text="item">
          </h2>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import bus from '../util/msgbus'
// import echarts from 'echarts'
export default {
  components: {},
  data () {
    return {
      activeNames: ['1'],
      dailyData: []
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {
    dailyData () {
      return this.dailyData
      // this.dailyInfo = this.dailyData
    }
  },
  // 方法
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    bus.$on('dailyData', res => {
      this.dailyData = res
    })
  }
}
</script>
<style scoped>
#cardbox {
  /* text-align: center; */
  display: inline-flex;
  width: 540px;
  padding: 20px;
  background-clip: padding-box;
  margin: 20px 10px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid rgba(183, 183, 183, 0.125);
}
.el-carousel {
  /* margin: 20px auto; */
  text-align: center;
}
.el-carousel--horizontal {
  overflow-x: inherit;
}
.text-top {
  width: 460px;
  text-align: center;
  color: #48c9b0;
}
.text-val {
  /* text-align: center; */
  color: #2ecc71;
}
.el-carousel__item:nth-child(2n) {
  background-color: #2980b9;
  border-radius: 10px;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.3);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #2980b9;
  border-radius: 10px;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.3);
}
</style>
