<template>
  <div class="row">
    <form class="col s6 offset-s3" @submit.prevent="handleSubmit" method="post">
      <h1>Create</h1>
      <div class="input-field">
        <input type="text" v-model="title" name="title" id="title" class="validate" required>
        <label for="title">Title</label>
        <span class="helper-text" data-error="Title is required"></span>
      </div>
      <div class="chips" ref="chips"></div>
      <div class="input-field">
        <textarea
          v-model="description"
          name="description" 
          id="description"
          class="materialize-textarea validate"
          :maxlength="maxDescLength"
          required
        ></textarea>
        <label for="description">Description</label>
        <span class="character-counter">{{ descLength }}/{{ maxDescLength }}</span>
      </div>
      <div class="input-field">
        <input type="text" ref="datepicker" class="datepicker">
      </div>
      <div class="input-field">
        <button type="submit" class="btn waves-effect waves-light">Send</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .character-counter {
    float: right;
  }
</style>

<script>
export default {
  name: 'home',
  mounted() {
    this.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: 'Tags'
    })

    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    })
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  },
  data() {
    return {
      title: '',
      description: '',
      chips: null,
      date: null,
      maxDescLength: 2048
    }
  },
  computed: {
    descLength() {
      return this.description.length
    }
  },
  methods: {
    handleSubmit() {
      const task = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        tags: this.chips.chipsData,
        date: this.date.date,
        status: 'active'
      }

      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  }
}
</script>
