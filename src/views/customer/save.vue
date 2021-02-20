<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="顾客名称">
        <el-input v-model="customer.custName"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import customer from '@/api/customer'

export default {
  data() {
    return {
      customer: {
        custName: ''
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
      customer.getCustomer(id)
        .then(response => {
          this.customer = response.data.customer
        })
    },
    saveOrUpdate() {
      if (!this.customer.id) {
        this.save()
      } else {
        this.update()
      }
    },
    update() {
      customer.updateCustomer(this.customer)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/customer/list' })
        })
    },
    save() {
      customer.insertCustomer(this.customer)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/customer/list' })
        })
    }
  }
}
</script>
