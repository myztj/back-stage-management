<template>
  <div>
    <!-- 搜索 -->
    <el-form :inline="true" :model="value" class="demo-form-inline">
      <template v-for="item in myFormParams">
        <el-form-item
          :label="item.label"
          v-if="item.type !== 'select' && item.type == 'input'"
        >
          <el-input
            size="mini"
            :placeholder="item.label"
            v-model="value[item.prop]"
          ></el-input>
        </el-form-item>
        <el-form-item :label="item.label" v-else-if="item.type === 'select'">
          <el-select
            v-model="value[item.prop]"
            :placeholder="item.label"
            size="mini"
          >
            <el-option
              :label="ele.text"
              :value="ele.code"
              v-for="(ele, index) in item.options"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="!item.type">
          <el-button
            :size="item.size"
            :icon="item.icon"
            :type="item.types"
            @click="item.onclick"
            >{{ item.text }}</el-button
          >
        </el-form-item>
      </template>
    </el-form>
    <!-- 搜索 -->
    <!-- 表格 -->
    <el-table  row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :data="tableData" stripe border style="width: 100%">
        <template  v-for="(item,index) in tableHaeder">
      <el-table-column v-bind="item" v-if="item.type=='selection'"></el-table-column>
      <el-table-column v-bind="item" v-if="item.type=='index'"></el-table-column>
      <el-table-column v-bind="item" v-if="item.prop!='ispublic'&& item.prop &&item.prop!=='status'&& !item.type"></el-table-column>
      <el-table-column v-bind="item" v-if="item.prop=='ispublic'">
          <template v-slot="scope">
            <el-tag :type="scope.row.ispublic?'danger':'success'">{{scope.row.ispublic?'不公开':'公开'}}</el-tag>
          </template>
      </el-table-column>
       <el-table-column v-bind="item" v-if="item.prop=='status'&& !item.type">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status=='0'">未审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status=='1'">审核通过</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status=='2'">审核未通过</el-tag>
            <el-tag type="danger" v-else>已删除</el-tag>
          </template>
      </el-table-column>
      <el-table-column v-bind="item" v-if="item.prop=='imageUrl'&& item.type=='img'">
          <template v-slot="scope">
            <img :src="scope.row.imageUrl" alt="">
          </template>
      </el-table-column>
      <el-table-column v-bind="item" v-if="item.prop=='status'&& item.type">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status=='1'">正常</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status=='0'">禁用</el-tag>
          </template>
      </el-table-column>
       <el-table-column  fixed="right" label="操作" width="300" v-if="!item.prop && item.type==='option'">
      <template slot-scope="scope">
        <el-button v-if="ele.prop.includes(scope.row.status) || ele.prop ==='false'" @click="ele.onclick(scope.row)" :type="ele.type" size="small" v-for="(ele,index) in item.options" :key="index">{{ele.text}}</el-button>
      </template>
    </el-table-column>
        </template>
    </el-table-column>
    </el-table>
    <!-- 表格 -->
    <!-- 分页 -->
    <el-pagination
      v-if="ispagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="value.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="value.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 分页 -->
    <!-- 模态框 -->
  <!-- <el-dialog
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
</el-dialog> -->
    <!-- 模态框 -->
  </div>
</template>

<script>
export default {
  name: 'my-elementui',
  props: {
    ispagination:{
      type:Boolean,
      default:true
    },
    title:{
      type:String,
      default:'新增'
    },
    dialogVisible:{
      type:Boolean,
      default:false
    },
    value: {
      type: Object,
      default: () => {}
    },
    myFormParams: {
      type: [],
      default: () => []
    },
    tableHaeder:{
     type:[],
     default: () => []
    },
    tableData:{
        type:Array,
        default: () => []
    },
    page:{
        type:Number,
        default:1
    },
    size:{
        type:Number,
        default:20
    },
    total:{
        type:[String,Number]
    },
    rules:{
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleSizeChange(val){
        console.log(val);
      this.$emit('handleSizeChange',val)
    },
    handleCurrentChange(val){
      this.$emit('handleCurrentChange',val)
    },
    submitForm(){
       console.log('提交');
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

<style lang="scss" scoped>
img{
  width: 90px;
  height: 60px;
}
</style>

