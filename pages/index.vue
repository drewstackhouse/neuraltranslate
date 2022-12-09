<template>
  <v-container>
    <v-row align="center" justify="center" :no-gutters="this.$vuetify.breakpoint.smAndDown">
      <input-area />
      <output-area />
    </v-row>
  </v-container>
</template>

<script>

import InputArea from "../components/InputArea.vue";
import OutputArea from "../components/OutputArea.vue";

import { mapMutations, mapGetters } from "vuex";

export default {
  created: async function () {
    let languages = await this.$repositories.metadata.get('languages');
    languages = languages["data"];
    languages.sort((a, b) => (a.language > b.language) ? 1 : ((b.language > a.language) ? -1 : 0));
    this.setLanguages(languages);

    this.setSl(
      languages.filter(x => x["code"] === "en")[0]
    );

    this.setTl(
      languages.filter(x => x["code"] === "fr")[0]
    );

    let parameters = await this.$repositories.metadata.get('parameters');
    parameters = parameters["data"];
    this.setParameters(parameters);
  },
  components: {
    InputArea,
    OutputArea,
  },
  methods: {
    ...mapMutations(["setLanguages", "setParameters", "setSl", "setTl"]),
  },
  computed: {
    ...mapGetters({
      "sl": "getSl",
      "tl": "getTl",
      "languages": "getLanguages",
      "parameters": "getParameters"
    })
  }
}

</script>