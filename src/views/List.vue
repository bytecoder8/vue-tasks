<template>
  <div>
    <div class="row">
      <h1>Task List</h1>

      <div class="input-field col s6">
        <select v-model="filter" ref="select">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="outdated">Outdated</option>
        </select>
      </div>
    </div>

    <div class="row">
      <table v-if="tasksSorted.length" class="col s12 m12 responsive-table stripped">
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
          <tr v-for="(task, index) of filteredTasks" :key="task.id">
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
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      filter: null
    }
  },
  computed: {
    ...mapGetters(['tasksSorted']),
    filteredTasks() {
      if (!this.filter) {
        return this.tasksSorted
      }
      return this.tasksSorted.filter(task => task.status === this.filter)
    }
  },
  mounted() {
    window.M.FormSelect.init(this.$refs.select)
  }
}
</script>