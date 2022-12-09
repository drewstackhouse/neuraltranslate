<template>
  <v-app dark>
    <v-app-bar fixed app flat class="transparent">
      <v-toolbar-title></v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>{{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid fill-width fill-height>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: 'DefaultLayout',
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      "sl": "getSl",
      "tl": "getTl",
      "query": "getQuery",
      "translation": "getTranslation",
      "languages": "getLanguages",
      "typing":"getTyping"
    })
  },
  methods: {
    logVariable(something) {
      console.log(JSON.parse(JSON.stringify(something)))
    }
  }
}
</script>
