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
    <el-select class="change-vehicle"
               v-model="vehicle_id"
               placeholder="请选择筛选车辆"
               size="small"
               @change="getData">
      <el-option v-for="item in vehicle"
                 :key="item.index"
                 :label="item.value"
                 :value="item.value">
      </el-option>
    </el-select>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5,10,14]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="formData.length">
    </el-pagination>
    <el-table ref="filterTable"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="formData
              .slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :filter-change="filterTagTable"
              border
              stripe
              style="width: 100%;text-align: center;">
      <el-table-column label="start_time"
                       width="200">
        <template slot-scope="scope">
          <p v-show="scope.row.es_start"><span style="color:blue;font-weight: bold">ES: </span>{{ scope.row.es_start }}</p>
          <p v-show="scope.row.takeover_start"><span style="color:red;font-weight: bold">TO: </span>{{ scope.row.takeover_start }}</p>
        </template>
      </el-table-column>
      <el-table-column label="duration"
                       width="200">
        <template slot-scope="scope">
          <p v-show="scope.row.es_start"><span style="color:blue;font-weight: bold">ES: </span>{{ Math.round(scope.row.es_time) }}秒</p>
          <p v-show="scope.row.takeover_start"><span style="color:red;font-weight: bold">TO: </span>{{ Math.round(scope.row.takeover_time) }}秒</p>
        </template>
      </el-table-column>
      <el-table-column label="type"
                       prop="type"
                       width="200">
        <template slot-scope="scope">
          <el-tag type="warning"
                  effect="dark">{{activeName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="vehicle_id"
                       prop="vehicle_id"
                       width="180">
        <template slot-scope="scope">
          <el-tag type="success"
                  effect="dark">{{scope.row.vehicle_id }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="park"
                       width="240">
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
      <el-table-column prop="tag"
                       label="tag"
                       width="360">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cause_type != null"
                  type="info"
                  closable
                  effect="dark"
                  @close="handleClose(scope.$index, scope.row)"
                  :disable-transitions="true">{{scope.row.cause_type}}</el-tag>
          <div v-else
               id="typeChoose">
            <el-cascader :options="cause_type"
                         :props="{ expandTrigger: 'hover' }"
                         @change="causeType">
            </el-cascader>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="comment"
                       width="360">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cause_desc"
                    placeholder="原因描述"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Options"
                       width="260">
        <template slot-scope="scope">
          <el-button size="mini"
                     :plain="true"
                     type="success"
                     @click="handleSubmit(scope.$index, scope.row)">submit</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">ignore</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: '',
      activeName: 'e_stop',
      formData: [],
      formtData: [],
      vehicle_id: '',
      tableData: [], // 数据
      currentPage: 1, // 默认显示第一页
      pageSize: 14, // 默认每页显示10条
      totalNum: '', // 总页数
      arr: [],
      vehicle: [],
      cause_type: [],
      tagc: true,
      index_cause_type: ''
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
    },
    index_cause_type (e) {
      return this.index_cause_type
    },
    formData () {
      return this.formData
    }
  },

  // 方法
  methods: {
    getLIst () {
      let that = this
      this.axios
        .get(
          '/api/vehicle/draw-list-vehicle',
          {},
          {
            useLoading: true
          }
        )
        .then(function (data) {
          that.vehicle = data.datas
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    getData (type) {
      let that = this
      that.axios
        .post(
          '/api/vehicle/etform-obtain',
          { 'type': that.activeName, 'vehicle_id': that.vehicle_id, 'pageNum': 1, 'pageSize': 100 },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          console.log(data.datas)
          that.formData = data.datas.real.result
          that.cause_type = data.datas.cause_type
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
      this.handleCurrentChange(1)
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
    handleClose (index, row) {
      row.cause_type = null
    },
    causeType (value) {
      this.index_cause_type = value[1]
    },
    filterTagTable (filters) {
      if (filters.aStatus) {
        // this.listQuery.status = filters.aStatus[0]
        console.log('aaa')
      }
      this.getAll() // 筛选所选项下的所有数据，需要调用后端接口
    },
    handleSubmit (index, row) {
      let that = this
      const h1 = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h1('p', null,
          [
            h1('span', null, '你的接管描述：'),
            h1('i', { style: 'color: teal' }, row.cause_desc)
          ]
        ),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              // console.log(that.index_cause_type)
              that.axios
                .post(
                  '/api/vehicle/handle',
                  { 'id': row.id, 'cause_type': that.index_cause_type, 'cause_desc': row.cause_desc },
                  {
                    useLoading: true
                  }
                )
                .then(function (data) {
                  // console.log(data)
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
    this.getLIst()
  }
}
</script>
<style>
.change-vehicle {
  position: absolute;
  top: 0;
  left: 300px;
}
.el-pagination {
  position: absolute;
  top: -30px;
  right: 0;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  text-align: right;
  margin: 30px auto;
  padding-right: 160px;
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
