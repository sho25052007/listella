<template>
  <v-btn
    small
    elevation="2"
    outlined
    color="success"
    @click="$store.commit('toggleSorting')"
    class="btn-done-sorting"
  >
      Done Sorting
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="sass">
    .btn-done-sorting
        position: fixed
        bottom: 20px
        left: 50%
        transform: translateX(-50%)
</style>