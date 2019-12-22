<template>
  <div id="app">
    <div class="container">
      <Navbar />
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~materialize-css/dist/css/materialize.min.css";
</style>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
