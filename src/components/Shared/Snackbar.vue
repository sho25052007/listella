<template>
  <v-snackbar
      v-model="$store.state.snackbar.show"
      :color="$store.state.snackbar.color"
      outlined
      text
    >
      {{ $store.state.snackbar.text }}

      <template v-slot:action="{ attrs }">
          <v-icon
          v-bind="attrs"
          color="grey lighten-1"
          @click="$store.commit('hideSnackbar')">
            mdi-close
          </v-icon>
      </template>
    </v-snackbar>
</template>

<style lang="sass">
  div.v-snack:not(.v-snack--absolute)
    height: 100%
</style>