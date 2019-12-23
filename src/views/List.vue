<template>
  <div>
    <div class="row">
      <h1>{{ $l('taskList') }}</h1>

      <div class="input-field col s6">
        <select v-model="filter" ref="select">
          <option value="">{{ $l('all') }}</option>
          <option value="active">{{ $l('active') }}</option>
          <option value="completed">{{ $l('completed') }}</option>
          <option value="outdated">{{ $l('outdated') }}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <table v-if="tasksSorted.length" class="col s12 m12 responsive-table stripped">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $l('date') }}</th>
            <th>{{ $l('title') }}</th>
            <th>{{ $l('description') }}</th>
            <th>{{ $l('status') }}</th>
            <th>{{ $l('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) of filteredTasks" :key="task.id">
            <td>{{ index + 1 }}</td>
            <td>{{ new Date(task.date).toLocaleDateString() }}</td>
            <td>{{ task.title }}</td>
            <td class="desc-td"><div class="desc-text">{{ task.description }}</div></td>
            <td>{{ $l(task.status) }}</td>
            <td>
              <router-link 
                tag="button" class="btn bnt-small waves-effect waves-light" 
                :to="'/task/' + task.id"
              >{{ $l('open') }}</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>
        {{ $l('noTasksYet') }}. <router-link to="/create">{{ $l('create') }}?</router-link>
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
      filter: null,
      select: null
    }
  },
  computed: {
    ...mapGetters(['tasksSorted']),
    ...mapState(['locale']),
    filteredTasks() {
      if (!this.filter) {
        return this.tasksSorted
      }
      return this.tasksSorted.filter(task => task.status === this.filter)
    }
  },
  methods: {
    initSelect() {
      this.destroySelect()
      this.$nextTick( () => {
        this.select = window.M.FormSelect.init(this.$refs.select)
      })
    },
    destroySelect() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
        this.select = null
      }
    }
  },
  watch: {
    locale() {
      this.initSelect()
    }
  },
  mounted() {
    this.initSelect()
  },
  destroyed() {
    this.destroySelect()
  }
}
</script>