<template>
  <div class='check-form'>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="180px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="填表人"
                        prop="operator">
            <el-col :span="12">
              <el-input v-model="form.operator"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出车日期"
                        required>
            <el-col :span="11">
              <el-form-item prop="day">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="form.day"
                                format="yyyy.MM.dd"
                                value-format="yyyy.MM.dd"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left"><i class="el-icon-edit"></i> 静态检查项</el-divider>
      <el-row v-for="item in this.static"
              :index="item.index"
              :key="item.index"
              class="top-item">
        <el-col :span="12">
          <el-form-item>
            <span slot="label"
                  v-text="item.name"></span>
            <el-tooltip class="item"
                        effect="dark"
                        placement="top-start">
              <span slot="content"
                    v-text="item.description"></span>
              <el-select v-model="item.status"
                         placeholder="检查">
                <el-option label="OK"
                           value="0"></el-option>
                <el-option label="有问题"
                           value="1"></el-option>
              </el-select>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input v-model="item.comment"
                    v-show="item.status == 1"
                    placeholder="填写详细信息"></el-input>
        </el-col>
      </el-row>
      <el-divider content-position="left"><i class="el-icon-edit"></i>动态检查项</el-divider>
      <el-row v-for="item in this.dynamic"
              :index="item.index"
              :key="item.index"
              class="dynamic-item">
        <el-col :span="12">
          <el-form-item>
            <span slot="label"
                  v-text="item.name"></span>
            <el-tooltip class="item"
                        effect="dark"
                        placement="top-start">
              <span slot="content"
                    v-text="item.description"></span>
              <el-select v-model="item.status"
                         placeholder="检查">
                <el-option label="正常"
                           value="0"></el-option>
                <el-option label="有问题"
                           value="1"></el-option>
              </el-select>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input v-model="item.comment"
                    v-show="item.status == 1"
                    placeholder="填写详细信息"></el-input>
        </el-col>
      </el-row>
      <el-col style="text-align: center">
        <el-radio-group v-model="form.block"
                        fill='409EFF'>
          <el-radio-button label="0">未影响当天正常测试</el-radio-button>
          <el-radio-button label="1">有影响当天正常测试</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col style="text-align: center">
        <el-button type="success"
                   round
                   @click="onSubmit1(form), drawer = true">SUBMIT</el-button>
      </el-col>
    </el-form>
    <el-drawer title="我是标题"
               :visible.sync="drawer"
               :with-header="false">
      <el-table :data="this.form.info"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column property="name"
                         label="检查项"
                         width="150"></el-table-column>
        <!-- <el-table-column property="description"
                         label="姓名"
                         width="200"></el-table-column> -->
        <el-table-column property="comment"
                         label="故障说明"></el-table-column>
      </el-table>
      <el-button @click="onSubmit(form)"
                 type="primary"
                 style="margin-left: 16px;">SUBMIT</el-button>
    </el-drawer>
  </div>
</template>

<script>

export default {
  props: {
    vehicle_id: String
  },
  components: {},
  data () {
    return {
      form: {
        vehicleId: '',
        day: '',
        operator: '',
        block: '0',
        info: []
      },
      drawer: false,
      block: 0,
      static: [],
      dynamic: [],
      rules: {
        operator: [
          { required: true, message: '请输入填表人姓名', trigger: 'blur' }
        ],
        day: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {
    vehicle_id () {
      this.form.vehicleId = this.vehicle_id
    },
    form () {
      return this.form
    }
    // staticform () {
    //   // return this.form.info.push(this.staticform)
    //   // this.form.info.push(this.staticform)
    // },
    // dynamicform () {
    //   // return this.dynamicform
    //   // this.form.info.push(this.dynamicform)
    // }
  },
  // 方法
  methods: {
    menuList () {
      let that = this
      this.axios
        .get(
          '/api/inspection-form/menu-list',
          {},
          {
            useLoading: true
          }
        )
        .then(function (data) {
          // console.log(data)
          that.static = data.datas.static
          that.dynamic = data.datas.dynamic
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    onSubmit1 (formName) {
      this.$message({
        message: '待发布',
        type: 'success'
      })
      // let that = this
      // console.log(that.form)
      // for (let i = 0; i < that.static.length; i++) {
      //   // that.form.info.status[i] == that.static[i].status
      //   if (that.static[i].status == 1) {
      //     that.form.info.push(that.static[i])
      //   }
      // }
      // for (let i = 0; i < that.dynamic.length; i++) {
      //   if (that.dynamic[i].status == 1) {
      //     that.form.info.push(that.dynamic[i])
      //   }
      // }
      // console.log(that.form)
    },
    handleSelectionChange (val) {
      // this.multipleSelection = val
      let that = this
      for (let i = 0; i < val.length; i++) {
        val[i].level = '1'
      }
      console.log(that.form)
    },
    onSubmit (formName) {
      this.$message({
        message: '待发布',
        type: 'success'
      })
      // let that = this
      // that.axios
      //   .post(
      //     '/api/inspection-form/day',
      //     {
      //       'vehicleId': that.form.vehicleId,
      //       'day': that.form.day,
      //       'operator': that.form.operator,
      //       'block': that.form.block,
      //       'info': that.form.info
      //     },
      //     {
      //       useLoading: true
      //     }
      //   )
      //   .then(function (data) {
      //     // console.log(data)
      //     that.$message({
      //       message: '提交成功',
      //       type: 'success'
      //     })
      //   })
      //   .catch(function (err) {
      //     that.$message({
      //       message: err,
      //       type: 'error'
      //     })
      //   })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.menuList()
  }
}
</script>
<style scoped>
.top-item {
  width: 600px;
  display: inline-flex;
}
.dynamic-item {
  width: 600px;
  display: inline-flex;
}
</style>
