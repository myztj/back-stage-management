<template>
  <div>
    <el-dialog :title="title" :visible.sync="isflag" width="30%">
      <el-form
        :model="value"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <template v-for="item in dialogFormparams">
          <el-form-item v-bind="item" v-if="item.type == 'input'">
            <el-input v-model="value[item.prop]"></el-input>
          </el-form-item>
          <el-form-item v-bind="item" v-if="item.type == 'img'">
            <!-- <img :src="value[item.prop]" alt="" /> -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-bind="item" v-if="item.type == 'radio'">
            <el-radio-group v-model="value[item.prop]">
              <el-radio v-model="value[item.prop]" :label="1">正常</el-radio>
              <el-radio v-model="value[item.prop]" :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-bind="item" v-if="item.type == 'number'">
            <el-input-number
              v-model="value[item.prop]"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item v-bind="item" v-if="item.type == 'textarea'">
            <el-input type="textarea" v-model="value[item.prop]"></el-input>
          </el-form-item>
          <el-form-item v-bind="item" v-if="item.type == 'select'">
            <el-select v-model="value[item.prop]" :placeholder="item.label">
              <el-option label="新页面" value="shanghai"></el-option>
              <el-option label="当前页面" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'newDialog',
  props: {
    dialogFormparams: {
      type: Array,
      default: () => []
    },
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
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      articleBody: '',
      imageUrl: ''
    }
  },
  watch:{
      value(){
        this.imageUrl=this.value.imageUrl
      }
  },
  methods: {
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        this.$emit('changeImg',file.name)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.imageUrl = URL.createObjectURL(file);
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    handelrPass() {
      this.$emit('handelrPass', this.value.id)
    },
    handelrNotPass() {
      this.$emit('handelrNotPass', this.value.id)
    },
    handleChange() {},
    handleChange() {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      console.log('重置取消')
    }
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

<style lang="scss" scoped>
img {
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
