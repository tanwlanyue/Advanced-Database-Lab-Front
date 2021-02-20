<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="carQuery.type" placeholder="车辆类型">
          <el-option :value="1" label="滴滴出行"/>
          <el-option :value="2" label="曹操出行"/>
          <el-option :value="3" label="神州打车"/>
          <el-option :value="4" label="美团打车"/>
          <el-option :value="5" label="本地出租"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="carQuery.location" placeholder="地区"/>
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

      <el-table-column label="类型" width="150">
        <template slot-scope="scope">
          <p  v-if="scope.row.type===1">滴滴出行</p>
          <p  v-if="scope.row.type===2">曹操出行</p>
          <p  v-if="scope.row.type===3">神州打车</p>
          <p  v-if="scope.row.type===4">美团打车</p>
          <p  v-if="scope.row.type===5">本地出租</p>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="地区" width="400"/>
      <el-table-column prop="price" label="价格" width="100"/>
      <el-table-column prop="numCars" label="总车辆数" width="100"/>
      <el-table-column prop="numAvail" label="可用车辆" width="100"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/car/edit/'+scope.row.id">
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
import car from '@/api/car'
import reservation from '@/api/reservation'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      carQuery: {},
      showReButton: false,
      reservation: {
        custName: '',
        resvType: 2,
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
      car.getList(this.page, this.limit, this.carQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    resetData() {
      this.carQuery = {}
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
