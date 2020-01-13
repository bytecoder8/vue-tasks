<template>
  <div class="row">
    <form class="col s12 m6 offset-m3" @submit.prevent="handleSubmit" method="post">
      <h1>{{ $l(isNewTask ? 'create' : 'update') }}</h1>
      <div class="input-field">
        <input type="text" v-model="form.title" name="title" id="title" class="validate" required>
        <label for="title">{{ $l('title') }}</label>
        <span class="helper-text" :data-error="$l('titleRequired')"></span>
      </div>
      <div class="chips" ref="chips">
        <input ref="chipsInput" />
      </div>
      <div class="input-field">
        <textarea
          v-model="form.description"
          ref="textarea"
          name="description" 
          id="description"
          class="materialize-textarea validate description"
          :maxlength="maxDescLength"
          required
        ></textarea>
        <label for="description">{{ $l('description') }}</label>
        <span class="helper-text" :data-error="$l('descriptionRequired')"></span>
        <span class="character-counter">{{ descLength }}/{{ maxDescLength }}</span>
      </div>
      <div class="input-field">
        <input type="text" ref="datepicker" class="datepicker">
      </div>

      <div v-if="isNewTask">
        <button type="submit" class="btn waves-effect waves-light">{{ $l('send') }}</button>
      </div>
      <div v-else>
        <button type="submit" class="btn waves-effect waves-light">{{ $l('update') }}</button>
        <button type="button" @click.prevent="completeTask" class="btn blue waves-effect waves-light complete-btn"
          >{{ $l('completeTask') }}</button>
      </div>

    </form>
  </div>
</template>

<style scoped>
  .character-counter {
    float: right;
  }
  .complete-btn {
    margin-left: 1rem;
  }
</style>

<script>
import { TYPES } from '@/types'
import { mapState } from 'vuex'

export default {
  name: 'home',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: function () {
        return new Date()
      }
    },
    tags: {
      type: Array,
      default: function () {
        return []
      }
    },
    taskId: [Number, String]
  },
  mounted() {
    this.chips = window.M.Chips.init(this.$refs.chips, {
      placeholder: this.$l('enterTags'),
      data: this.tags
    })

    this.datePicker = window.M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: this.date,
      setDefaultDate: true
    })

    this.$nextTick(function() {
      window.M.updateTextFields()
      window.M.textareaAutoResize(this.$refs.textarea)
    })
  },
  destroyed() {
    if (this.datePicker && this.datePicker.destroy) {
      this.datePicker.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  },
  data() {
    return {
      form: {
        title: this.title,
        description: this.description,
      },
      chips: null,
      datePicker: null,
      maxDescLength: 2048
    }
  },
  computed: {
    ...mapState(['locale']),
    descLength() {
      return this.form.description.length
    },
    isNewTask() {
      return !this.taskId
    }
  },
  watch: {
    locale() {
      if (this.chips) {
        const placeholder = this.$l('enterTags')
        this.chips.options.placeholder = placeholder
        this.$refs.chipsInput.placeholder = placeholder
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.isNewTask) {
        const newTask = {
          id: Date.now(),
          title: this.form.title,
          description: this.form.description,
          tags: this.chips.chipsData,
          date: this.datePicker.date
        }
        this.$store.dispatch('createTask', newTask)
      } else {
        const toUpdate = {
          id: this.taskId,
          title: this.form.title,
          description: this.form.description,
          tags: this.chips.chipsData,
          date: this.datePicker.date
        }
        this.$store.dispatch('updateTask', toUpdate)
      }

      this.$router.push('/list')
    },
    completeTask() {
      this.$store.dispatch('completeTask', { id: this.taskId })
      this.$router.push('/list')
    }
  }
}
</script>
