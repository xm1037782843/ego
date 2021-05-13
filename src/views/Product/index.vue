<template>
  <div class="product">
    <!-- 1. 搜索框 ------>
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="changeInput"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="addProduct">添加</el-button>
    </div>
    <!-- 弹框-------- -->
    <!-- <ProductDialog :dialogVisible='dialogVisible' @change='change'/> -->
    <ProductDialog ref="myDialog" :rowData='rowData' :title='title' />

    <!-- 2. 表格数据列表 ---------->
    <div class="list">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="myTable"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="num" label="商品数量" width="100">
        </el-table-column>
        <el-table-column prop="category" label="规格类目" width="100">
        </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 按钮 -->
    <div style="margin-top: 10px;">
      <el-button @click="deleteSelection">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
    </div>

    <!-- 3. 分页 --------------->
    <div class="page">
      <Pagination
        :pageSize="pageSize"
        :total="total"
        @currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ProductDialog from "./ProductDialog";
export default {
  components: {
    Pagination,
    ProductDialog,
  },
  data() {
    return {
      // dialogVisible:false,//弹框状态
      tableData: [],
      pageSize: 1, //每页多少条
      total: 10, //总条数
      input: "", //输入框值
      idArr: [], //id数组
      rowData: {}, //当前行数据
      title:"添加商品",
    };
  },
  methods: {
    /**
     * 编辑按钮
     */
    handleEdit(index, row) {
      this.$refs.myDialog.dialogVisible = true;
      //把当前行的数据--传递给子组件弹框
      // this.rowData = row;
      // this.rowData = Object.assign({},row)//新地址
      this.rowData = {...row};

      this.title='编辑商品'
    },
    /**
     * 删除按钮
     */
    handleDelete(index, rowData) {
      console.log(index, rowData);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteItemById({
              id: rowData.id,
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //更新视图
                this.http(1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 取消按钮
     */
    toggleSelection(rows) {
      if (rows) {
        //切换行显示
        rows.forEach((row) => {
          this.$refs.myTable.toggleRowSelection(row);
        });
      } else {
        //取消按钮
        this.$refs.myTable.clearSelection();
      }
    },
    //删除
    deleteHandle(){
       this.$api
        .batchDelete({
          idArr: this.idArr,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //更新视图
            this.http(1);
          }
        });
    },
    /**
     * 批量删除
     */
    deleteSelection() {
      console.log("删除");
      if(this.idArr.length<=0){
        this.$message.error('错了哦，必须选中至少一个商品才可以删除');
        return;
      }
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteHandle()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });    
    },
    /**
     * 选择
     */
    selectionChange(selection) {
      let arr = [];
      selection.forEach((ele) => {
        arr.push(ele.id);
      });
      console.log(arr);
      this.idArr = arr;
    },
    //获取点击的页码--
    currentPage(val) {
      this.http(val);
    },
    change() {
      this.dialogVisible = false;
    },
    /**
     * 搜索框功能-- 失去焦点--回车
     */
    changeInput(val) {
      console.log("-----", val);
      if (val) {
        this.$api
          .search({
            search: val,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log(res.result);
              this.tableData = res.result;
              this.pageSize = 8;
              this.total = res.result.length;
            } else {
              console.log("查无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 1;
            }
          });
      } else {
        this.http(1);
      }
    },
    /***
     * 添加商品
     */
    addProduct() {
      console.log("添加商品");
      // this.dialogVisible=true;
      this.$refs.myDialog.dialogVisible = true;
      this.title='添加商品'
    },
    //网络请求动态数据---
    http(page) {
      this.$api.productList({ page }).then((res) => {
        console.log("----", res);
        if (res.status === 200) {
          this.tableData = res.data;
          this.pageSize = res.pageSize;
          this.total = res.total;
        }
      });
    },
  },
  mounted() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 20px 10px;
  button {
    margin-left: 10px;
  }
}
.list {
  margin-left: 10px;
  margin-right: 10px;
}
.page {
  text-align: center;
  margin-top: 10px;
  .el-pagination {
    padding: 0;
  }
}
</style>