<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="flightQuery.fromCity" placeholder="出发地"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="flightQuery.arivCity" placeholder="目的地"/>
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

      <el-table-column prop="flightNum" label="航班号" width="150"/>
      <el-table-column prop="price" label="价格" width="100"/>
      <el-table-column prop="numSeats" label="座位数量" width="100"/>
      <el-table-column prop="numAvail" label="可用座位" width="100"/>
      <el-table-column prop="fromCity" label="出发地" width="200"/>
      <el-table-column prop="arivCity" label="目的地" width="200"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/flight/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button v-if="showReButton" type="success" size="mini" icon="el-icon-circle-check" @click="makeReservation(scope.row.id)">预定
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
import flight from '@/api/flight'
import reservation from '@/api/reservation'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      flightQuery: {},
      showReButton: false,
      reservation: {
        custName: '',
        resvType: 1,
        resvKey: ''
      }
    }
  },
  created() {
    this.getList()
    this.init()
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.reservation.custName = this.$route.params.id
        this.showReButton = true
      }
    },
    getList(page = 1) {
      this.page = page
      flight.getList(this.page, this.limit, this.flightQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    resetData() {
      this.flightQuery = {}
      this.getList()
    },
    makeReservation(id) {
      this.reservation.resvKey = id
      this.$confirm('是否确认预定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        reservation.insertReservation(this.reservation)
          .then(response => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.getList()
          })
      })
    }
  }
}
</script>
