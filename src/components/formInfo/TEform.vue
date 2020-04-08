<template>
  <div class="formData">
    <el-tabs v-model="activeName">
      <el-tab-pane label="E_Stop"
                   name="E_Stop"
                   @click="getdata(activeName)">
      </el-tab-pane>
      <el-tab-pane label="take_over"
                   name="take_over"
                   @click="getdata()">
      </el-tab-pane>
      <el-tab-pane label="TandE"
                   name="TandE"
                   @click="getdata()">
      </el-tab-pane>
    </el-tabs>
    <el-table ref="filterTable"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="formData"
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
          <el-tag type="success"
                  effect="dark"
                  v-if="scope.row.type == 1">E_stop</el-tag>
          <el-tag type="success"
                  effect="dark"
                  v-if="scope.row.type == 2">takeOver</el-tag>
          <el-tag type="success"
                  effect="dark"
                  v-if="scope.row.type == 3">E&T</el-tag>
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
          <span>loading</span>
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
          <el-input v-model="scope.row.submit_val"
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
      <!-- <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5,10,14]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="formData.length">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: '',
      activeName: 'E_Stop',
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
    // formData (formData) {
    //   for (let i = 0; i < formData.length; i++) {
    //     this.arr[i] = formData[i].vehicle_id
    //   }
    //   this.$nextTick(function () {
    //     let vehicle2 = Array.from(new Set(this.arr))
    //     for (let j = 0; j < vehicle2.length; j++) {
    //       this.vehicle.push({ text: vehicle2[j], value: vehicle2[j] })
    //     }
    //   })
    // },
    formData () {
      return this.formData
    },
    submit_val (e) {
      return this.tableData.submit_info
    }
  },

  // 方法
  methods: {
    getData (activeName) {
      let that = this
      console.log(activeName)
      that.axios
        .post(
          '/api/vehicle/etform-obtain',
          { 'type': 'E_stop', 'pageNum': 3, 'pageSize': 20 },
          {
            useLoading: true
          }
        )
        .then(function (data) {
          console.log(data.datas[0].result)
          // if ()
          that.formData = data.datas[0].result
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
      console.log(index, row)
      const h = this.$createElement
      this.$message({
        message: h('div', null, [
          h('span', null, '你的接管描述： '),
          h('div', { style: 'color: teal' }, row.submit_val)
        ]),
        type: 'success'
      })
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // this.totalNum = this.formData.length
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getData()
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
