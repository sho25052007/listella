<template>
  <v-text-field
      class="field-add-task pa-4"
      placeholder="Add Task"
      hide-details
      clearable
      v-model="newTaskTitle"
      @keyup.enter="addTask"
    >

    <template v-slot:append>
      <v-icon
        @click="addTask"
        :disabled="newTaskTitleInvalid"
      >
        mdi-plus-circle-outline
        </v-icon>
    </template>

    </v-text-field>
</template>

<script>
export default {
    data () {
      return {
        newTaskTitle: '',
      }
    },
    computed: {
      newTaskTitleInvalid() {
        return !this.newTaskTitle
      }
    },
    methods: {
      addTask() {
        if(!this.newTaskTitleInvalid) {
          this.$store.dispatch('addTask', this.newTaskTitle)
          this.newTaskTitle = ''
        }
      },
    }
}
</script>

<style lang="sass">
  .field-add-task.v-input--is-focused
    .v-input__slot
      background: rgba(122, 184, 229, 0.3) !important
</style>