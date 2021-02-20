<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="车辆类型">
        <el-select v-model="car.type">
          <el-option :value="1" label="滴滴出行"/>
          <el-option :value="2" label="曹操出行"/>
          <el-option :value="3" label="神州打车"/>
          <el-option :value="4" label="美团打车"/>
          <el-option :value="5" label="本地出租"/>
        </el-select>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="car.location"/>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="car.price"/>
      </el-form-item>
      <el-form-item label="总车辆数">
        <el-input v-model="car.numCars"/>
      </el-form-item>
      <el-form-item label="可用车辆">
        <el-input v-model="car.numAvail"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import car from '@/api/car'

export default {
  data() {
    return {
      car: {
        type: '',
        location: '',
        price: 10,
        numCars: 100,
        numAvail: 100
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
      car.getCar(id)
        .then(response => {
          this.car = response.data.car
        })
    },
    saveOrUpdate() {
      if (!this.car.id) {
        this.save()
      } else {
        this.update()
      }
    },
    update() {
      car.updateCar(this.car)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/car/list' })
        })
    },
    save() {
      car.insertCar(this.car)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/car/list' })
        })
    }
  }
}
</script>
