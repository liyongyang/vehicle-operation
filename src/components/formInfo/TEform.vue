<template>
  <div class="formData">
    <el-tabs v-model="activeName">
      <el-tab-pane label="E_Stop"
                   name="e_stop">
      </el-tab-pane>
      <el-tab-pane label="take_over"
                   name="takeover">
      </el-tab-pane>
      <el-tab-pane label="TandE"
                   name="eandt">
      </el-tab-pane>
    </el-tabs>
    <el-table ref="filterTable"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="formData
              .slice((currentPage-1)*pageSize,currentPage*pageSize)"
              border
              stripe
              style="width: 100%;text-align: center;">
      <el-table-column label="time"
                       width="160">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="type"
                       prop="type"
                       width="120">
        <template slot-scope="scope">
          <el-tag type="warning"
                  effect="dark">{{activeName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="vehicle_id"
                       prop="vehicle_id"
                       width="160"
                       column-key="vehicle_id"
                       :filters="vehicle"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <el-tag type="success"
                  effect="dark">{{scope.row.vehicle_id }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="park"
                       width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover"
                      placement="top">
            <p>start_time: {{ scope.row.start_time }}</p>
            <p>end_time: {{ scope.row.end_time }}</p>
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium"
                      effect="dark">{{ scope.row.park_id }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="单次接管时间"
                       width="240">
        <template slot-scope="scope">
          <span>loading</span>
        </template>
      </el-table-column>
      <el-table-column label="单次接管距离"
                       width="240">
        <template slot-scope="scope">
          <span>{{scope.row.es_distance}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tag"
                       label="标签"
                       width="160">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cause_type === '红绿灯' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.cause_type}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="接管描述"
                       width="280">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cause_desc"
                    placeholder="原因描述"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button size="mini"
                     :plain="true"
                     type="success"
                     @click="handleEdit(scope.$index, scope.row,)">提交</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="change-page">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5,10,14]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="formData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: '',
      activeName: 'e_stop',
      formData: [],
      tableData: [], // 数据
      currentPage: 1, // 默认显示第一页
      pageSize: 10, // 默认每页显示10条
      totalNum: '', // 总页数
      arr: [],
      vehicle: []
    }
  },
  // 监听
  computed: {
  },
  // 监控
  watch: {
    cause_desc (e) {
      return this.tableData.cause_desc
    },
    activeName (value) {
      this.getData(value)
    }
  },

  // 方法
  methods: {
    getData (type) {
      let that = this
      that.axios
        .post(
          '/api/vehicle/etform-obtain',
          { 'type': that.activeName, 'pageNum': 1, 'pageSize': 50 },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          // console.log(data)
          that.formData = data.datas[0].result
          that.$nextTick(function () {
            for (let i = 0; i < that.formData.length; i++) {
              this.arr[i] = that.formData[i].vehicle_id
            }
            this.$nextTick(function () {
              let vehicle2 = Array.from(new Set(this.arr))
              for (let j = 0; j < vehicle2.length; j++) {
                this.vehicle.push({ text: vehicle2[j], value: vehicle2[j] })
              }
            })
            this.vehicle = []
          })
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    openFullScreen (time) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      setTimeout(() => loading.close(), time)
    },
    handleSizeChange (psize) {
      this.openFullScreen(800)
      this.pageSize = psize
    },
    handleCurrentChange (cpage) {
      this.openFullScreen(800)
      this.currentPage = cpage
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleEdit (index, row) {
      let that = this
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '你的接管描述：'),
          h('i', { style: 'color: teal' }, row.cause_desc)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              that.axios
                .post(
                  '/api/vehicle/handle',
                  { 'id': row.id, 'cause_desc': row.cause_desc },
                  {
                    useLoading: true
                  }
                )
                .then(function (data) {
                })
                .catch(function (err) {
                  that.$message({
                    message: err,
                    type: 'error'
                  })
                })
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 500)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      })
    },
    handleDelete (index, row) {
      // console.log(index, row)
      let h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '该模块功能'),
          h('i', { style: 'color: teal' }, '待讨论')
        ]),
        type: 'error'
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.totalNum = this.formData.length
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    let type = 'e_stop'
    this.getData(type)
  }
}
</script>
<style>
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  text-align: right;
  margin: 30px auto;
  padding-right: 340px;
}
.el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center;
}
</style>
