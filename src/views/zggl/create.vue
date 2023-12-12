<template>
  <div>
    <!-- 搜索框 -->
    <el-form style="margin-top: 20px" :inline="true" :model="searchForm" size="small"
             @keyup.enter.native="getDataList('init')"
    >
      <el-form-item>
        <el-input v-model="searchForm.empName" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <!--        <el-input v-model="searchForm.deptName" placeholder="部门" clearable></el-input>-->
        <el-select v-model="searchForm.deptName" placeholder="请选择部门" clearable filterable>
          <el-option v-for="item in deptNameList" :key="item.index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--        <el-input v-model="searchForm.empDegreeName" placeholder="学历" clearable></el-input>-->
        <el-select v-model="searchForm.empDegreeName" placeholder="请选择学历" clearable filterable>
          <el-option v-for="item in empDegreeNameList" :key="item.index" :label="item.label" :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onSearch(true)">查询</el-button>
      </el-form-item>
      <div style="float: right;">
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="showEdit()">新增</el-button>
        </el-form-item>
        <!--        <el-form-item>
                  <el-button icon="el-icon-delete" type="danger" @click="onBatchDelete()" :disabled="selectionList.length <= 0">删除</el-button>
                </el-form-item>-->
        <el-form-item>
          <el-button icon="el-icon-download" type="primary" @click="exportData()">导出</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 信息框 -->
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :key="key"
      border
      :default-sort="{prop: 'age', order: 'descending'}"

    >
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column
        prop="empName"
        label="职工姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
      >
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门名称"
      >
      </el-table-column>
      <el-table-column
        prop="empDegreeName"
        label="学历"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--
        @size-change //  pageSize 改变时会触发 每页条数
        @current-change //  currentPage 改变时会触发 当前页
        :current-page //  默认false
        background//  是否为分页按钮添加背景色
        :page-sizes // 每页显示个数选择器的选项设置 这是下拉框可以选择的，每选择一行，要展示多少内容 类似：[10, 20, 30, 40, 50, 100]
        page-sizes=显示当前行的条数
        layout // 组件布局，子组件名用逗号分隔
       :total // 总条目数,一般从展示列表的总数获取
     -->
    <el-pagination
      style="text-align: center;margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      :page-sizes="[1,3,5,10,20]"
      :page-size="pagesize"
      layout="total, sizes,  prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>

    <el-dialog :title="windowsTitle" :visible.sync="dialogFormVisible">
      <el-form ref="editForm" :model="form" :rules="rules" label-width="100px" class="myForm" size="small"
               v-loading="loading"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="员工姓名" prop="empName">
              <el-input v-model="form.empName" placeholder="员工姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择部门" clearable filterable>
                <el-option v-for="item in sexList" :key="item.index" :label="item.label" :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" type="number" placeholder="年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="deptName">
              <el-select v-model="form.deptName" placeholder="请选择部门" clearable filterable>
                <el-option v-for="item in deptNameList" :key="item.index" :label="item.label" :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学历" prop="empDegreeName">
              <el-select v-model="form.empDegreeName" placeholder="请选择学历" clearable filterable>
                <el-option v-for="item in empDegreeNameList" :key="item.index" :label="item.label" :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="doClose()">取 消</el-button>
        <el-button :disabled="buttonloading" type="primary" @click="doSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import api from './api'
import { getpage } from './api'
import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'CreateArticle',
  components: {},
  data() {
    return {
      windowsTitle: '新增',
      searchForm: {},//查询参数
      //分页相关
      tableData: [], // 用户列表
      currentPage: 1, // 初始页
      pagesize: 10,  // 初始每页的数据
      form: {},//新增编辑表单
      rules: {
        empName: [
          { required: true, message: '员工姓名不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别：男；女不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        empDegreeName: [
          { required: true, message: '学历【大专、本科、研究生】不能为空', trigger: 'blur' }
        ]
      },//表单验证
      dialogFormVisible: false,//新增编辑窗口是否打开
      loading: false,//弹窗加载
      buttonloading: false,//提交按钮 防止前端多提交
      key: '',
      url: {
        searchUrl: '/api/zgsj/page',
        infoUrl: '/api/zgsj/find',
        saveUrl: '/api/zgsj/save',
        updateUrl: '/api/zgsj/update',
        deleteUrl: '/api/zgsj/delete',
        exportUrl: '/api/zgsj/download'
      },
      deptNameList: [
        {
          value: '业务部',
          label: '业务部'
        },
        {
          value: '人事部',
          label: '人事部'
        },
        {
          value: '后勤部',
          label: '后勤部'
        }

      ],//部门复选框
      empDegreeNameList: [
        {
          value: '大专',
          label: '大专'
        },
        {
          value: '本科',
          label: '本科'
        },
        {
          value: '研究生',
          label: '研究生'
        }
      ],//学历复选
      sexList: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }]
    }
  },
  mounted() {
    this.init()
    console.log(this.$router)
  },
  methods: {
    init() {
      this.initwindows()
      this.onSearch()
    },
    //查询方法
    onSearch() {
      getpage(this.searchForm).then(
        res => {
          this.tableData = res.result
          console.log('this.tableData', this.tableData)
        }
      )
    },
    //分页相关
    handleSizeChange(size) {
      this.pagesize = size
      this.key = Math.random()
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.key = Math.random()
      console.log(this.currentPage)  //点击第几页
    },
    //分页相关结束
    //弹窗相关
    initwindows() {
      this.form = {
        id: '',
        empName: '',
        sex: '',
        age: '',
        deptName: '',
        empDegreeName: ''
      }
    },

    showEdit(id) {//打开弹窗按钮
      if (null == id) {
        //没id就为新增
        this.dialogFormVisible = true
      } else {
        this.windowsTitle = '编辑'
        //有id则为编辑
        request({
          url: this.url.infoUrl + '/' + id,
          method: 'get'
        }).then(res => {
          this.form = res.result
          this.dialogFormVisible = true
        })
          .catch(() => {
            this.afterInfoError()
            this.loading = false
          })
      }

    },

    doClose() {//关闭窗口
      this.initwindows()//初始化窗口
      this.dialogFormVisible = false//关闭
    },
    doSubmit() {//提交
      //this.buttonloading=true//防止提交
      if ('' == this.form.id) {//没id新增的数据走添加
        this.doSave()
      } else {//有id编辑数据
        this.doUpdate()
      }
    },
    //新增
    doSave() {
      this.loading = true
      request({
        url: this.url.saveUrl,
        method: 'post',
        data: this.form
      }).then(res => {
        if (res.result == 'ok') {
          Message({
            message: '数据添加成功',
            type: 'success',
            duration: 2000,
            showClose: true
          })
        }
        this.loading = false
        this.doClose()
        this.onSearch()
      })
        .catch(() => {
          this.loading = false
        })
    },
    //编辑
    doUpdate() {
      this.loading = true
      request({
        url: this.url.updateUrl,
        method: 'post',
        data: this.form
      }).then(res => {
        if (res.result == 'ok') {
          Message({
            message: '数据修改成功',
            type: 'success',
            duration: 2000,
            showClose: true
          })
        }
        this.loading = false
        this.doClose()
        this.onSearch()
      })
        .catch(() => {
          this.loading = false
        })
    },
    //删除
    onDelete(id) {
      MessageBox.confirm('确定要删除当前数据？', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          request({
            url: this.url.deleteUrl + '/' + id,
            method: 'post'
          }).then(res => {
            Message({
              message: '数据删除成功',
              type: 'success',
              duration: 2000,
              showClose: true
            })
            this.onSearch()
          })
        })
        .catch(() => {
        })
    },
    //导出
    exportData() {
      window.location.href = 'http://localhost:8080/api/zgsj/export'
    },


  }
}
</script>

