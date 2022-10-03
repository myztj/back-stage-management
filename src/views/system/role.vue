<template>
  <div>
    <my-elemene-ui
      :total="total"
      v-model="categoryForm"
      :myFormParams="myFormParams"
      :tableData="categoryTable"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :tableHaeder="tableHaeder"
    />

    <new-dialog
      :dialogVisible.sync="dialogVisible"
      :title="title"
      v-model="dialogForm"
      @submitForm="submitForm"
      :dialogFormparams="dialogFormparams"
      :rules="rules"
    />
    <!-- 树形弹窗没有封装 -->
    <el-dialog title="提示" :visible.sync="dialogTree" width="30%">
      <el-tree
        :data="treeList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 树形弹窗没有封装 -->
  </div>
</template>

<script>
import {
  getLabellistApi,
  editFindApi,
  addSubmitApi,
  editSubmitApi,
  terrListApi
} from '../../utlis/API/role'
export default {
  name: 'mylabel',
  components: {
    MyElemeneUi: () => import('../../components/MyElemeneUi/'),
    newDialog: () => import('../../components/MyElemeneUi/newDiaLog')
  },
  data() {
    return {
      dialogTree: false,
      title: '新增',
      dialogVisible: false,
      categoryForm: {
        current: 1,
        size: 20,
        status: '',
        name: ''
      },
      total: 20,
      categoryTable: [],
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
       defaultProps: {
          children: 'children',
          label: 'name'
        },
      tableHaeder: [
        {
          type: 'selection'
        },
        {
          label: '序号',
          type: 'index',
          width: '60'
        },
        {
          label: '角色',
          prop: 'name'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '操作',
          type: 'option',
          options: [
            {
              text: '分配权限',
              onclick: this.handerPrivileges,
              type: 'primary',
              prop: 'false'
            },
            {
              text: '编辑',
              onclick: this.handelrdeitList,
              type: 'success',
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
        name: '',
        remark: ''
      },
      dialogFormparams: [
        {
          label: '标签名称',
          prop: 'name',
          type: 'input'
        },
        {
          label: '分类名称',
          prop: 'remark',
          type: 'textarea'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        categoryName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      treeList: []
    }
  },

  methods: {
    async handerPrivileges() {
      try {
        let res = await terrListApi()
        console.log(res.data.data)
        this.treeList = res.data.data
      } catch (error) {}
      this.dialogTree=true
    },
    //重置
    reset() {
      this.categoryForm.status = ''
      this.categoryForm.user = ''
    },
    //编辑添加确定提交事件
    submitForm() {
      this.dialogForm.id ? this.editSubmit() : this.addSubmit()
    },
    //添加提交
    async addSubmit() {
      try {
        let res = await addSubmitApi(this.dialogForm)
        console.log(res)
        this.$message.success('添加成功')
        this.getLableList()
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    //编辑提交
    async editSubmit() {
      try {
        let res = await editSubmitApi()
        console.log(res)
        this.$message.success('编辑成功')
        this.dialogForm.id = ''
        this.getLableList()
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    //搜索
    querySubmit() {
      this.getLableList()
    },
    //新增
    newAdd() {
      this.title = '新增'
      this.dialogVisible = true
    },
    //编辑
    async handelrdeitList(row) {
      this.title = '编辑'
      try {
        let res = await editFindApi(row.id)
        console.log(res.data.data)
        this.dialogForm = res.data.data
      } catch (error) {
        console.log(error)
      }
      this.dialogVisible = true
    },
    handerDelet() {},
    async getLableList() {
      try {
        let res = await getLabellistApi(this.categoryForm)
        console.log(res.data.data.records)
        this.total = res.data.data.total
        this.categoryTable = res.data.data.records
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange(val) {
      this.categoryForm
      this.getLableList()
    },
    handleCurrentChange() {
      this.getLableList()
    }
  },
  created() {
    this.getLableList()
  }
}
</script>

<style></style>
