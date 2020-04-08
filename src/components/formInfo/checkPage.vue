<template>
  <div class="check-page">
    <div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="活动名称"
                      prop="name"
                      :required="isHaveTo">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域"
                      prop="region">
          <el-select v-model="ruleForm.region"
                     placeholder="请选择活动区域"
                     style="width:100%">
            <el-option label="必填"
                       value="0"></el-option>
            <el-option label="非必填"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeName: String
  },
  data () {
    // 验证活动名称的函数
    let validateName = (rule, value, callback) => {
      // 当活动名称为空值且为必填时，抛出错误，反之通过校验
      if (this.ruleForm.name === '' && this.isHaveTo) {
        callback(new Error('请输入活动名称'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        region: ''
      },
      rules: {
        name: [{ validator: validateName }],
        region: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      }
    }
  },
  // 监听
  computed: {
    isHaveTo: function () {
      return this.ruleForm.region !== `1`
    }

  },
  // 监控
  watch: {
  },

  // 方法
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(`已提交表单`)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  }
}
</script>
