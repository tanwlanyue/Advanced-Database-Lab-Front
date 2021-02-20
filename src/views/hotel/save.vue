<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="酒店名称">
        <el-input v-model="hotel.name"/>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="hotel.location"/>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="hotel.price"/>
      </el-form-item>
      <el-form-item label="总房间数">
        <el-input v-model="hotel.numRooms"/>
      </el-form-item>
      <el-form-item label="可用房间">
        <el-input v-model="hotel.numAvail"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import hotel from '@/api/hotel'

export default {
  data() {
    return {
      hotel: {
        name: '',
        location: '',
        price: 150,
        numRooms: 100,
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
      hotel.getHotel(id)
        .then(response => {
          this.hotel = response.data.hotel
        })
    },
    saveOrUpdate() {
      if (!this.hotel.id) {
        this.save()
      } else {
        this.update()
      }
    },
    update() {
      hotel.updateHotel(this.hotel)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/hotel/list' })
        })
    },
    save() {
      hotel.insertHotel(this.hotel)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/hotel/list' })
        })
    }
  }
}
</script>
