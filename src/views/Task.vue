<template>
  <div>
    <TaskForm 
      :title="task.title"
      :description="task.description"
      :status="task.status"
      :taskId="task.id"
      :date="new Date(task.date)"
      :tags="task.tags"
    />
  </div>
</template>

<script>
import TaskForm from '@/components/TaskForm'

export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id)
    }
  },
  components: {
    TaskForm
  }
}
</script>