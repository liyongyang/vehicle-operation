<template>
  <div class="dailyMsg container-fluid">
    <el-divider v-if="dailyData == ''"
                content-position="left"><i class="el-icon-loading"></i> 选择你想查看的车辆数据. . .</el-divider>
    <div v-else
         class="starter-template">
      <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-6 col-xl-3"
             v-for="(item, key) in dailyData"
             :index="item.id"
             :key="item.id">
          <div class="card-box bg-success">
            <h4 class="text-white text m-b-20"
                v-text="key"></h4>
            <h3 class="text-white"
                v-text="item">
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../util/msgbus'
import dailyOption from './dailyOption'
export default {
  components: { dailyOption },
  data () {
    return {
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
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    bus.$on('dailyData', res => {
      this.$nextTick(function () {
        this.dailyData = res
      })
    })
  }
}
</script>
<style scoped>
@import "../../assets/style.css";
</style>
