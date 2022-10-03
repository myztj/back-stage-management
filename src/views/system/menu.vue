<template>
  <div>
    <my-elemene-ui
    :ispagination="ispagination"
    :total="total" 
    v-model="categoryForm"
    :myFormParams="myFormParams"
    :tableData="categoryTable"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :tableHaeder="tableHaeder"/>

    <new-dialog 
    :dialogVisible.sync="dialogVisible" 
    :title="title"
    v-model="dialogForm" 
    @submitForm="submitForm"
    :dialogFormparams="dialogFormparams"
    :rules="rules"/>
  </div>
</template>

<script>
import {getLabellistApi,editFindApi,addSubmitApi,editSubmitApi} from '../../utlis/API/menu'
export default {
  name: 'mylabel',
  components:{
    MyElemeneUi:()=>import('../../components/MyElemeneUi/'),
    newDialog:()=>import('../../components/MyElemeneUi/newDiaLog')
  },
  data() {
    return {
      ispagination:false,
      title:'新增',
      dialogVisible:false,
      categoryForm:{
         current:1,
         size:20,
         status:'',
         name:''
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
          type: 'index',
          width:'60'
        },
        {
          label: '名称',
          prop: 'name',
          sortable:true
        },
        {
          label: '请求地址',
          prop: 'url',
           sortable:true
        },
          {
          label: '权限标识',
          prop: 'code',
           sortable:true
        },
         {
          label: '类型',
          prop: 'type',
           sortable:true
        },
         {
          label: '图标',
          prop: 'icon',
           sortable:true
        },
         {
          label: '排序',
          prop: 'sort',
           sortable:true
        },
        {
          label: '操作',
          type: 'option',
          options: [
             {
              text: '新增',
              onclick: this.rowAddmenu,
              type: 'primary',
              prop: 'false'
            },
            {
              text: '编辑',
              onclick: this.handelrdeitList,
              type: '',
              prop: 'false'
            },
            {
              text: '删除',
              onclick: this.handerDelet,
              type: 'danger',
              prop: 'false'
            }
          ]
        }
      ],
      dialogForm: {
        type: '',
        name: '',
        code: '',
        url: '',
        icon: '',
        sort: '',
        remark: '',
      },
      dialogFormparams:[
        {
          label:'类型',
          prop:'type',
          type:'radio'
        },
        {
          label:'名称',
          prop:'name',
          type:'input'
        },
         {
          label:'权限标识',
          prop:'code',
          type:'input'
        },
        {
          label:'请求地址',
          prop:'url',
          type:'input'
        },
        {
          label:'图标',
          prop:'icon',
          type:'input'
        },
        {
          label:'排序',
          prop:'sort',
          type:'number'
        },
        {
          label:'备注',
          prop:'remark',
          type:'textarea'
        },
      ],
      rules: {
          name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          categoryName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
          }
    }
  },
  
  methods: {
    rowAddmenu(){},
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
        this.getLableList()
        this.dialogVisible=false
      } catch (error) {
        console.log(error);
      }
    },
    //编辑提交
   async editSubmit(){
      try {
        let res = await editSubmitApi()
        console.log(res);
        this.$message.success('编辑成功')
        this.dialogForm.id=''
        this.getLableList()
        this.dialogVisible=false
      } catch (error) {
        console.log(error);
      }
    },
    //搜索
    querySubmit(){
      this.getLableList()
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
      console.log(res.data);
      this.dialogForm=res.data.data
     } catch (error) {
       console.log(error);
     }
     this.dialogVisible=true
    },
    handerDelet(){},
   async getLableList(){
      try {
        let res = await getLabellistApi(this.categoryForm)
        console.log(res.data.data);
        this.total=res.data.total
        this.categoryTable=res.data.data
      } catch (error) {
        console.log(error);
      }
    },
    handleSizeChange(val){
      this.categoryForm
      this.getLableList()
    },
    handleCurrentChange(){
      this.getLableList()
    }
  },
  created() {
    this.getLableList()
  },
}
</script>

<style></style>

