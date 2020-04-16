<template>
  <div class='check-form'>
    <el-form ref="form"
             :model="form"
             label-width="180px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="填表人">
            <el-col :span="12">
              <el-input v-model="form.operator"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出车日期">
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.day"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left"><i class="el-icon-edit"></i> 静态检查项</el-divider>
      <el-row v-for="item in staticform"
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
      <el-row v-for="item in dynamicform"
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
                   @click="onSubmit()">SUBMIT</el-button>
      </el-col>
    </el-form>
    <div v-text="this.vehicle_id"></div>
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
        block: '',
        info: []
      },
      StaticTopic: [
        {
          'name': '车轮&车胎',
          'point': '车轮螺栓是否松动，轮胎是否破损缺气',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '车身外观',
          'point': '车门铰链门锁是否正常，车身外观是否影响产品形象',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '车内环境',
          'point': '是否有漏水，灰尘等问题',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '方向盘位置',
          'point': '方向盘、车轮位置是否零位',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '灯光系统',
          'point': '照明灯，转向灯，制动灯是否正常',
          'status': 'OK',
          'comment': ''
        },

        {
          'name': '车辆电压',
          'point': '车辆电压是否充足',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '扫刷系统',
          'point': '扫刷是否存在机械故障，刷毛长度是否不足',
          'status': 'OK',
          'comment': ''
        },

        {
          'name': '喷水系统',
          'point': '水箱水量是否充足，喷头是否堵住',
          'status': 'OK',
          'comment': ''
        },

        {
          'name': '雷达相机',
          'point': '雷达相机是否有遮挡破损或明显异常',
          'status': 'OK',
          'comment': ''
        }
      ],
      dynamicTopic: [
        {
          'name': '转向报文',
          'point': '在车辆上电后及自动驾驶前，将方向盘以90度的幅度来回转动三次，检查角度传感器是否激活',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '转向系统报文检查',
          'point': '检查转向系统报文1E5反馈是否正常（报文第2、3位非FF为正常）candump can1 | grep 1E5 can1 | grep 1E5',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '线控转向',
          'point': '车辆上电后及自动驾驶前，将方向盘以90度的幅度来回转动三次，检查在Brake and shake状态下是否接受线控',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '制动报文',
          'point': '检查制动系统报文是否正常（针对配置IBS系统的车辆）candump can1 | grep 219 看是否有数据 can1 | grep 219 看有没有数据',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '基础制动',
          'point': '人工踩踏制动踏板时是否工作正常，无明显卡涩现象',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '线控制动',
          'point': '检查在brake_and_shake状态下制动系统是否接受线控',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '手刹系统',
          'point': '检查手刹是否正常工作，电机是否能正常执行手刹动作',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '异响问题',
          'point': '车辆行驶转向是否有明显异响',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '急停开关',
          'point': '自动驾驶模式下急停开关是否有效',
          'status': 'OK',
          'comment': ''
        },
        {
          'name': '转向异响检查',
          'point': '检查转向过程中，转向系统是否存在明显异响',
          'status': 'OK',
          'comment': ''
        }
      ],
      block: 0,
      staticform: [],
      dynamicform: []
    }
  },
  // 监听
  computed: {},
  // 监控
  watch: {
    vehicle_id () {
      this.form.vehicleId = this.vehicle_id
    },
    staticform () {
      return this.staticform
    },
    dynamicform () {
      return this.dynamicform
    }
  },
  // 方法
  methods: {
    getLIst () {
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
          that.staticform = data.datas.static
          that.dynamicform = data.datas.dynamic
          console.log(that.staticform)
        })
        .catch(function (err) {
          that.$message({
            message: err,
            type: 'error'
          })
        })
    },
    onSubmit () {
      console.log(this.form)
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
.top-item {
  width: 600px;
  display: inline-flex;
}
.dynamic-item {
  width: 600px;
  display: inline-flex;
}
</style>
