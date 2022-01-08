<template>
  <v-app>
    <!--<v-main class="grey darken-4">-->
      <v-main class="">
      <v-app-bar color="blue-grey darken-4" v-if="$route.path !== '/'" flat app height="80">
      <v-container fluid>
        <v-row align="center">
          <v-col>
        <!--<span :class="mobile ? 'text-h4 white--text font-weight-light' : 'text-h3 white--text font-weight-light'"><v-icon :style="mobile ? 'font-size: 40px' : 'font-size: 50px'" color="amber darken-4" class="pr-3 mb-2">mdi-translate</v-icon>Neural Translate</span>-->
        <span :class="mobile ? 'text-h5 white--text font-weight-light' : 'text-h4 white--text font-weight-light'"><v-icon x-large color="amber darken-4" class="pr-3 mb-2">mdi-translate</v-icon>Neural Translate</span>
          </v-col>
          <v-col class="text-right">
            <v-btn text x-large color="amber darken-4">About</v-btn>
            <v-btn text x-large color="amber darken-4">Contribute</v-btn>
          </v-col>
        </v-row>
      </v-container>
      </v-app-bar>
      <v-fade-transition mode="out-in">
        <Nuxt />
      </v-fade-transition>
      <v-footer height="75px" app color="blue-grey darken-4" v-if="$route.path !== '/' && !mobile">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col class="">
        <span class="white--text font-weight-light text-body-1">Made by <a href="https://www.drewstackhouse.com" rel="noopener noreferrer" target="_blank" style="color: rgba(255, 111, 0, 1)">Drew Stackhouse</a></span>
          </v-col>
          <v-col class="text-right">
        <v-btn icon><v-icon color="amber darken-4">mdi-twitter</v-icon></v-btn>
        <v-btn icon><v-icon color="amber darken-4">mdi-linkedin</v-icon></v-btn>
        <v-btn icon><v-icon color="amber darken-4">mdi-github</v-icon></v-btn>
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
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  }
};
</script>

<style>

a {
  text-decoration: none;
}

</style>