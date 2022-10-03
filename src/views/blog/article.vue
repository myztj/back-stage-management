<template>
  <div>
    <my-element-ui
      v-model="queryForm"
      :myFormParams="myFormParams"
      :tableHaeder="tableHaeder"
      :tableData="tableData"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></my-element-ui>
    <rich-text-dialog
      :dialogVisible.sync="dialogVisible"
       v-model="dialogForm"
      :title="title"
      @handelrPass="handelrPass"
      @handelrNotPass="handelrNotPass"
    ></rich-text-dialog>
  </div>
</template>

<script>
import {
  getArticleListApi,
  getExamineApi,
  geiExamineListApi,
  handerlPassApi,
  handerlNotPassApi
} from '../../utlis/API/blog'
export default {
  name: 'my-article',
  components: {
    MyElementUi: () => import('../../components/MyElemeneUi/'),
    RichTextDialog: () => import('../../components/MyElemeneUi/RichTextDialog')
  },
  data() {
    return {
      dialogForm: {
        title: '',
        imageUrl: '',
        ispublic: '',
        summary: '',
        mdContent: '',
        list: ''
      },
      dialogVisible: false,
      queryForm: {
        current: 1,
        size: 10,
        status: '',
        title: ''
      },
      myFormParams: [
        {
          type: 'input',
          prop: 'title',
          label: '文章标题'
        },
        {
          type: 'select',
          prop: 'status',
          label: '状态',
          options: [
            {
              text: '未通过',
              code: 0
            },
            {
              text: '审核通过',
              code: 1
            },
            {
              text: '审核未通过',
              code: 2
            },
            {
              text: '已删除',
              code: 3
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
        }
      ],
      tableHaeder: [
        {
          label: '序号',
          type: 'index'
        },
        {
          label: '文章标题',
          prop: 'title'
        },
        {
          label: '浏览次数',
          prop: 'thumhup'
        },
        {
          label: '点赞数',
          prop: 'viewCount'
        },
        {
          label: '是否公开',
          prop: 'ispublic'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '最后更新时间',
          prop: 'updateDate'
        },
        {
          label: '操作',
          type: 'option',
          options: [
            {
              text: '查看',
              onclick: this.getExamineList,
              type: 'primary',
              prop: [0, 1, 2, 3]
            },
            {
              text: '审核',
              onclick: this.handerAudit,
              type: 'success',
              prop: [0]
            },
            {
              text: '删除',
              onclick: this.handerDelet,
              type: 'danger',
              prop: [0, 1, 2]
            }
          ]
        }
      ],
      total: 10,
      tableData: [],
      title: '查看'
    }
  },
  methods: {
    //审核通过
   async handelrPass(id){
      try {
        let res = await handerlPassApi(id)
        console.log(res);
        this.$message.success('审核通过')
        this.dialogVisible=false
        this.getArticleList()
      } catch (error) {
        console.log(error);
      }
    },
    //审核未通过
   async handelrNotPass(id){
        try {
        let res = await handerlNotPassApi(id)
        console.log(res);
        this.$message.error('审核未通过')
        this.dialogVisible=false
        this.getArticleList()
      } catch (error) {
        console.log(error) 
      }
    },
    handleSizeChange() {
      this.getArticleList()
    },
    handleCurrentChange() {
      this.getArticleList()
    },
    handerDelet(row) {
      console.log(row)
    },
    //审核
    handerAudit(row) {
      this.title = '审核文章'
      this.getExamineAllList(row.id)
      this.dialogVisible = true
    },
    //查看
    async getExamineList(row) {
      this.title = '查看'
      this.getExamineAllList(row.id)
      this.dialogVisible = true
    },
    async getExamineAllList(id) {
      try {
        let res = await getExamineApi(id)
        let list = await geiExamineListApi()
        // console.log(res);
        let lists = list.data.data.map((item) => item.name)
        list.data.data.forEach((item, index) => {
          lists[index] = lists[index] + ' /\n ' + item.labelList[0].name
        })
        this.dialogForm = res.data.data
        this.dialogForm.list = lists.join(' ')
      } catch (error) {
        console.log(error)
      }
    },
    async getArticleList() {
      try {
        const res = await getArticleListApi(this.queryForm)
        // console.log(res.data)
        this.total = res.data.code
        this.tableData = res.data.data.records
      } catch (error) {
        console.log(error)
      }
    },
    querySubmit() {},
    reset() {}
  },
  created() {
    this.getArticleList()
  }
}
</script>

<style></style>
