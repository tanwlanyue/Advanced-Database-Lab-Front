<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="航班号">
        <el-input v-model="flight.flightNum"/>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="flight.price"/>
      </el-form-item>
      <el-form-item label="总座位数">
        <el-input v-model="flight.numSeats"/>
      </el-form-item>
      <el-form-item label="可用座位">
        <el-input v-model="flight.numAvail"/>
      </el-form-item>
      <el-form-item label="出发地">
        <el-input v-model="flight.fromCity"/>
      </el-form-item>
      <el-form-item label="目的地">
        <el-input v-model="flight.arivCity"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import flight from '@/api/flight'

export default {
  data() {
    return {
      flight: {
        flightNum: '',
        price: 500,
        numSeats: 40,
        numAvail: 40,
        fromCity: '',
        arivCity: ''
      },
      saveBtnDisabled: false
    }
  },
  created() {
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
        const id = this.$route.params.id
        this.getInfo(id)
      }
    },
    getInfo(id) {
      flight.getFlight(id)
        .then(response => {
          this.flight = response.data.flight
        })
    },
    saveOrUpdate() {
      if (!this.flight.id) {
        this.save()
      } else {
        this.update()
      }
    },
    update() {
      flight.updateFlight(this.flight)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/flight/list' })
        })
    },
    save() {
      flight.insertFlight(this.flight)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/flight/list' })
        })
    }
  }
}
</script>
