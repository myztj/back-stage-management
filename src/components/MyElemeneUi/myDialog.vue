<template>
    <div>
<el-dialog
     :title="title"
     :visible.sync="isflag"
     width="30%">
      <el-form :model="value" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="分类名称" prop="name">
    <el-input v-model="value.name"></el-input>
  </el-form-item>
   <el-form-item label="状态" prop="status">
    <el-radio-group v-model="value.status">
      <el-radio v-model="value.status" :label="1">正常</el-radio>
      <el-radio v-model="value.status" :label="0">禁用</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="排序" prop="sort">
    <el-input-number v-model="value.sort" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
  </el-form-item>
    <el-form-item label="备注" prop="desc">
    <el-input type="textarea" v-model="value.remark"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
  </el-form>
</el-dialog>
    </div>
</template>

<script>
export default {
  name: 'RichTextDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: '查看'
    },
     rules:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      articleBody: ''
    }
  },
  methods: {
    handelrPass(){
        this.$emit('handelrPass',this.value.id)
    },
    handelrNotPass(){
      this.$emit('handelrNotPass',this.value.id)
    },
    handleChange(){

    },
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('submitForm')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(){
      console.log('重置取消');
    },
    
  },
  computed: {
    isflag: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  }
}
</script>

<style>

</style>
