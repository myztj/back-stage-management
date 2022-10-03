<template>
  <div>
    <el-dialog :title="title" :visible.sync="isflag" width="60%">
      <el-form ref="form" :model="value" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="value.title"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="value.list"
            placeholder="请选择活动区域"
            disabled
            style="width: 100%"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="主题">
          <img :src="value.imageUrl" alt="" />
        </el-form-item>
        <el-form-item label="是否公开">
          <el-radio-group v-model="value.ispublic">
            <el-radio v-model="value.ispublic" :label="1">公开</el-radio>
            <el-radio v-model="value.ispublic" :label="0">不公开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            v-model="value.summary"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="articleBody">
          <!-- 失去焦点时手动校验该字段 (当前 articleBody 属性值) -->
          <quill-editor
            @blur="$refs.form.validateField('articleBody')"
            v-model="value.mdContent"
          />
        </el-form-item>
        <el-form-item label-width="350px" v-if="title=='审核文章'">
          <el-button type="primary" @click="handelrPass">审计通过</el-button>
          <el-button type="danger" @click="handelrNotPass">审计未通过</el-button>
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
</style>
