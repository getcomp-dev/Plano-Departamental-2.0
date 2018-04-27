<template>
  <div class="DashboardHome">
    <h3>Dashboard</h3>
    <p>Olá {{getUsuarioFirstName}}!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardHome',

  computed: {
    ...mapGetters([
      'getUsuarioFirstName'
    ])
  }
}
</script>

<style scoped>
</style>