
<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-model="drawer"
    :mobile-breakpoint="768"
    app
    >
      <v-img
      class="pa-4"
        :height="$route.path === '/' ? '234' : '170'"
        src="motivation.jpg"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
      <v-avatar
        class="my-2"
        size="70"
      >
        <v-img
          src="portrait.jpg"
          alt="Sho"
          cover
        ></v-img>
      </v-avatar>
      <div class="white--text text-subtitle-1 font-weight-bold">Shoichrio Suzuki</div>
      <div class="white--text text-subtitle-2">sho25052007</div>
      </v-img>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      :height="$route.path === '/' ? '234' : '170'"
      src="mountains.png"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.7), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="py-0" fluid>
        <v-row :class="$route.path==='/' ? 'mt-4' : 'mt-0'">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <Search class="mr-3" />
        </v-row>

        <v-row>
          <v-app-bar-title class="ml-4 text-h4">{{ $store.state.appTitle }}</v-app-bar-title>
        </v-row>

        <v-row>
          <LiveDateTime />
        </v-row>

        <v-row class="my-3" v-if="$route.path === '/'">
          <FieldAddTask />
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <Snackbar />
    </v-main>

  </v-app>
</template>

<script>
  import FieldAddTask from '@/components/Todo/FieldAddTask.vue'
  import Snackbar from '@/components/Shared/Snackbar.vue'
  import Search from '@/components/Tools/Search.vue'
  import LiveDateTime from '@/components/Tools/LiveDateTime.vue'

  export default {
    mounted() {
        this.$store.dispatch('getTasks')
    },
    components: { Snackbar, Search, LiveDateTime,FieldAddTask },
    data: () => ({
      drawer: null,
      items: [
          { title: 'To-do', icon: 'mdi-format-list-checks', to: '/'},
          { title: 'About', icon: 'mdi-help-box', to: '/about'},
        ],
    }),
  }
</script>

<style lang="sass">
  .v-app-bar-title__content
    width: 200px !important
</style>