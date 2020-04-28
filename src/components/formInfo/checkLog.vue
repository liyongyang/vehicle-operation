<template>
  <div class='checkLog'>
    <!-- <div v-for="items in this.tableData"
         :index="items.index"
         :key="items.index">
      <div v-for="item in items.info"
           :index="item.index"
           :key="item.index">
        <span>{{item.name}} </span> <span>{{item.comment}} </span>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      tableData: []
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {},
  // 方法
  methods: {
    getLIst () {
      let that = this
      this.axios
        .get(
          '/api/inspection-form/list',
          {},
          {
            useLoading: true
          }
        )
        .then(function (data) {
          that.tableData = data.datas
          // console.log(that.tableData)
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
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
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getLIst()
  }
}
</script>
<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
