<template>
  <div>
    <div class="table-container">
      <slot></slot>
    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageIndexChange"
        :layout="pageLayout"
        :current-page.sync="myPageIndex"
        :page-size="myPageSize"
        :page-sizes="pageSizes"
        :total="myTotalSize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QzDataGrid',
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    pageSize: {
      type: Number | String,
      default: 10
    },
    pageIndex: {
      type: Number | String,
      default: 1
    },
    totalSize: {
      type: Number | String,
      default: 0
    },
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      myPageSize: parseInt(this.pageSize),
      myPageIndex: parseInt(this.pageIndex),
      myTotalSize: parseInt(this.totalSize)
    };
  },
  methods: {
    /**
     * 每页条数变化
     */
    pageSizeChange(val) {
      this.$emit('pageSizeChange', val);
    },
    /**
     * 当前页码变化
     */
    pageIndexChange(val) {
      this.$emit('pageIndexChange', val);
    }
  },
  watch: {
    /**
     * 当前页码变化监听
     */
    pageIndex(val, oldVal) {
      //console.log('pageIndx', val, oldVal);
      this.myPageIndex = parseInt(val);
    },
    /**
     * 每页条数变化监听
     */
    pageSize(val, oldVal) {
      //console.log('pageSize', val, oldVal);
      this.myPageSize = parseInt(val);
    },
    /**
     * 数据总数变化监听
     */
    totalSize(val, oldVal) {
      //console.log('totalSize', val, oldVal);
      this.myTotalSize = parseInt(val);
    }
  }
};
</script>

<style scoped>
.pagination-container{
  margin: 15px 0px;
  text-align: right;
}
.pagination-container .el-pagination{
  padding: 2px 5px;
}
</style>