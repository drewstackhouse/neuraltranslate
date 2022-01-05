<template>
  <v-app>
    <!--<v-main class="grey darken-4">-->
      <v-main>
      <v-app-bar color="blue-grey darken-4" v-if="$route.path !== '/'" flat app style="border-bottom: 1px solid rgba(255,255,255,0.1)">
        <span class="text-h5 white--text font-weight-light"><v-icon color="amber darken-4" class="mx-3 mb-2">mdi-translate</v-icon>Neural Translate</span>
      </v-app-bar>
      <v-fade-transition mode="out-in">
        <Nuxt />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style>

</style>