<template>
  <div class="row">
    <h1>Task List</h1>
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) of tasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td>{{ task.title }}</td>
          <td class="desc-td"><div class="desc-text">{{ task.description }}</div></td>
          <td>{{ task.status }}</td>
          <td>
            <router-link 
              tag="button" class="btn bnt-small waves-effect waves-light" 
              :to="'/task/' + task.id"
            >Open</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>
      No tasks yet. <router-link to="/">Create new one?</router-link>
    </p>
  </div>
</template>

<style scoped>
  .desc-td {
    max-width: 350px;
  }
  .desc-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['tasks'])
  }
}
</script>