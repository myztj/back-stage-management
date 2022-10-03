<template>
  <div>
    <my-elemene-ui 
    :total="total" 
    v-model="categoryForm"
    :myFormParams="myFormParams"
    :tableData="categoryTable"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :tableHaeder="tableHaeder"/>
    <my-dialog 
    :dialogVisible.sync="dialogVisible" 
    :title="title" v-model="dialogForm" 
    @submitForm="submitForm"
    :rules="rules"/>
  </div>
</template>

<script>
import {getCategoryLsitApi,editFindApi,addSubmitApi,editSubmitApi} from '../../utlis/API/category'
export default {
  components:{
    MyElemeneUi:()=>import('../../components/MyElemeneUi/'),
    MyDialog:()=>import('../../components/MyElemeneUi/myDialog')
  },
  name: 'my-category',
  data() {
    return {
      title:'新增',
      dialogVisible:false,
      categoryForm:{
         current:1,
         size:20,
         status:'',
         user:''
      },
      total:20,
      categoryTable:[],
      myFormParams: [
        {
          type: 'input',
          prop: 'user',
          label: '分类名称'
        },
        {
          type: 'select',
          prop: 'status',
          label: '状态',
          options: [
            {
              text: '禁用',
              code: 0
            },
            {
              text: '正常',
              code: 1
            }
          ]
        },
        {
          operate: 'button',
          text: '查询',
          onclick: this.querySubmit,
          types: 'primary',
          icon: 'el-icon-search',
          size: 'mini'
        },
        {
          operate: 'button',
          text: '重置',
          onclick: this.reset,
          types: '',
          icon: 'el-icon-refresh',
          size: 'mini'
        },
        {
          operate: 'button',
          text: '新增',
          onclick: this.newAdd,
          types: '',
          icon: 'primary',
          size: 'mini'
        }
      ],
       tableHaeder: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '排序',
          prop: 'sort'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '状态',
          prop: 'status',
          type:"2"
        },
        {
          label: '操作',
          type: 'option',
          options: [
            {
              text: '编辑',
              onclick: this.handelrdeitList,
              type: '',
              prop: [0, 1, 2, 3]
            },
            {
              text: '删除',
              onclick: this.handerDelet,
              type: 'danger',
              prop: [0, 1, 2,3]
            }
          ]
        }
      ],
      dialogForm: {
        name: '',
        remark: '',
        sort: '',
        status: ''
      },
      rules: {
          name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          sort: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          status: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          }
    }
  },
  
  methods: {
    //重置
    reset(){
     this.categoryForm.status=''
     this.categoryForm.user=''
    },
    //编辑添加确定提交事件
    submitForm(){
      this.dialogForm.id? this.editSubmit():this.addSubmit()
    },
    //添加提交
   async addSubmit(){
      try {
        let res = await addSubmitApi(this.dialogForm)
        console.log(res);
        this.$message.success('添加成功')
        this.getCategory()
        this.dialogVisible=false
      } catch (error) {
        console.log(error);
      }
    },
    //编辑提交
   async editSubmit(){
      try {
        let res = await editSubmitApi(this.dialogForm)
        console.log(res);
        this.$message.success('编辑成功')
        this.dialogForm.id=''
        this.getCategory()
        this.dialogVisible=false
      } catch (error) {
        console.log(error);
      }
    },
    //搜索
    querySubmit(){
      this.getCategory()
    },
    //新增
    newAdd(){
      this.title="新增"
      this.dialogVisible=true
    },
    //编辑
   async handelrdeitList(row){
     this.title="编辑"
     try {
      let res = await editFindApi(row.id)
      console.log(res.data.data);
      this.dialogForm=res.data.data
     } catch (error) {
       console.log(error);
     }
     this.dialogVisible=true
    },
    handerDelet(){},
   async getCategory(){
      try {
        let res = await getCategoryLsitApi(this.categoryForm)
        console.log(res.data.data.records);
        this.total=res.data.data.total
        this.categoryTable=res.data.data.records
      } catch (error) {
        console.log(error);
      }
    },
    handleSizeChange(val){
      this.categoryForm
      this.getCategory()
    },
    handleCurrentChange(){
      this.getCategory()
    }
  },
  created() {
    this.getCategory()
  },
}
</script>

<style></style>
