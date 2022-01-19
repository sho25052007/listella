<template>
    <v-dialog
        :value="true"
        persistent
        max-width="290"
    >
        <v-card>
        <v-card-title class="text-h5">
            Delete task?
        </v-card-title>
        <v-card-text>
            You are about to permanently delete this task.
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="grey lighten-1"
            text
            @click="$emit('close')"
            >
            Cancel
            </v-btn>
            <v-btn
            color="red lighten-1"
            text
            @click.stop="$store.dispatch('deleteTask', task.id)"
            >
            Accept
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['task']

}
</script>