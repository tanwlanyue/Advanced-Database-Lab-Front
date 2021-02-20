<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-input v-model="reservationQuery.custName" placeholder="顾客"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="custName" label="顾客名" width="150"/>
      <el-table-column label="预定类型" width="150">
        <template slot-scope="scope">
          <p  v-if="scope.row.resvType===1">航班</p>
          <p  v-if="scope.row.resvType===2">出租车</p>
          <p  v-if="scope.row.resvType===3">宾馆</p>
        </template>
      </el-table-column>
      <el-table-column prop="resvKey" label="预定信息" width="600"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import reservation from '@/api/reservation'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      reservationQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      reservation.getList(this.page, this.limit, this.reservationQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    resetData() {
      this.reservationQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将删除预订, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reservation.deleteById(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
      })
    }
  }
}
</script>
