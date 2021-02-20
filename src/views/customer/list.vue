<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="customerQuery.custName" placeholder="姓名"/>
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

      <el-table-column prop="custName" label="顾客姓名" width="150"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/flight/list/'+scope.row.id">
            <el-button type="info" size="mini" icon="el-icon-tickets">预定航班</el-button>
          </router-link>
          <router-link :to="'/car/list/'+scope.row.id">
            <el-button type="info" size="mini" icon="el-icon-tickets">预定出租车</el-button>
          </router-link>
          <router-link :to="'/hotel/list/'+scope.row.id">
            <el-button type="info" size="mini" icon="el-icon-tickets">预定宾馆房间</el-button>
          </router-link>
          <router-link :to="'/customer/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
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
import customer from '@/api/customer'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      customerQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      customer.getList(this.page, this.limit, this.customerQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    resetData() {
      this.customerQuery = {}
      this.getList()
    }
  }
}
</script>
