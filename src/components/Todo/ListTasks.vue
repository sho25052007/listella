<template>
    <v-list
      flat
      class="pt-0"
      v-if="$store.state.tasks.length"
    >
        <draggable
        handle=".handle"
        v-model="tasks"
        >
                <Task
                    v-for="task in tasks"
                    :key="task.id"
                    :task="task"
                />
        </draggable>
    </v-list>
    <NoTasks v-else />
</template>

<script>
import Task from './Task.vue'
import NoTasks from './NoTasks.vue'

import draggable from 'vuedraggable'

export default {
    components: { Task, NoTasks, draggable },
    computed: {
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.dispatch('setTasks', value)
            }
        }
    }
}
</script>