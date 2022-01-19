<template>
    <div class="no-task-msg">
        <v-icon
        size="100"
        color="primary lighten-3"
        >
        mdi-archive-off-outline
        </v-icon>
        <div class="heading-no-task text-h5 primary--text text--lighten-3 pt-3">
        No Tasks
        </div>
    </div>
</template>

<style lang="sass">
  .no-task-msg
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    opacity: 50%
</style>