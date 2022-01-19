<template>
<div>
    <v-menu
    bottom
    left
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary lighten-2"
            icon
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="handleClick(i)"
            >
            <v-list-item-icon class="pa-1">
                <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <DialogEdit
        :task="task"
        v-if="dialogs.edit"
        @close="dialogs.edit = false"
    />
    <DialogDueDate
        :task="task"
        v-if="dialogs.dueDate"
        @close="dialogs.dueDate = false"
    />
    <DialogDelete
        :task="task"
        v-if="dialogs.delete"
        @close="dialogs.delete = false"
    />
</div>
</template>

<script>
import DialogDelete from '../Dialogs/DialogDelete.vue'
import DialogEdit from '../Dialogs/DialogEdit.vue'
import DialogDueDate from '../Dialogs/DialogDueDate.vue'

export default {
    props: ['task'],
    components: { DialogDelete, DialogEdit, DialogDueDate },
    data () {
        return {
            dialogs: {
                dueDate: false,
                delete: false,
                edit: false
            },
            items: [
                {
                    title: 'Edit',
                    icon: 'mdi-pencil-outline',
                    click() {
                        this.dialogs.edit = true
                    }
                },
                {
                    title: 'Due Date',
                    icon: 'mdi-calendar-check-outline',
                    click() {
                        this.dialogs.dueDate = true
                    }
                },
                {
                    title: 'Delete',
                    icon: 'mdi-trash-can-outline',
                    click() {
                        this.dialogs.delete = true
                    }
                },
                {
                    title: 'Sort Order',
                    icon: 'mdi-cursor-move',
                    click() {
                        if (!this.$store.state.search) {
                            this.$store.commit('toggleSorting')
                        }
                        else {
                            this.$store.commit('showSnackbar', { text: 'Please stop search filter before sorting order!', color: 'red darken-3'})
                        }
                    }
                },
            ],
        }
    },
    methods: {
        handleClick(i) {
            this.items[i].click.call(this)
        }
    }
}
</script>

<style>

</style>