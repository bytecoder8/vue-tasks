<template>
  <div class="row">
    <h1>Tasks near deadline: 
      <router-link to="/list">{{tasksNearDeadline.length}}</router-link>
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['tasksNearDeadline'])
  }
}
</script>
