<template>
  <v-app>
    <v-main class="grey darken-4">
      <v-app-bar v-if="$route.path !== '/'" flat app style="border-bottom: 1px solid rgba(255,255,255,0.1)">
        <v-app-bar-title class="mr-12"><div>Neural Translate</div></v-app-bar-title>
        <v-spacer />
        <v-btn tile x-large plain to="translate">Translate</v-btn>
        <v-btn tile x-large plain to="about">About</v-btn>
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