<template>
  <v-app>
    <!--<v-main class="grey darken-4">-->
      <v-main class="">
      <v-app-bar prominent color="blue-grey darken-4" v-if="$route.path !== '/'" flat app>
      <v-container fluid fill-height>
        <v-row align="center">
          <v-col class="text-center">
        <span class="text-h3 white--text font-weight-light"><v-icon style="font-size: 50px" color="amber darken-4" class="mr-6 mb-2">mdi-translate</v-icon>Neural Translate</span>
          </v-col>
        </v-row>
      </v-container>
      </v-app-bar>
      <v-fade-transition mode="out-in">
        <Nuxt />
      </v-fade-transition>
      <v-footer height="75px" app color="blue-grey darken-4" v-if="$route.path !== '/'">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col class="text-center">
        <span class="white--text font-weight-light text-body-1">Made by <a href="https://www.drewstackhouse.com" rel="noopener noreferrer" target="_blank" style="color: rgba(255, 111, 0, 1)">Drew Stackhouse</a></span>
          </v-col>
        </v-row>
      </v-container>
      </v-footer>
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