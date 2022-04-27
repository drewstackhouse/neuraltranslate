<template>
  <v-container fluid>
    <mobile v-if="mobileLayout" />
    <desktop v-else />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { debounce } from "lodash";

import Mobile from "../components/Mobile.vue";
import Desktop from "../components/Desktop.vue";


export default {
  components: {
    Mobile, Desktop
  },
  data: () => ({
    pendingInput: "",
    debounceTime: 100,
  }),
  async beforeCreate() {
    if (!this.pairCodes) {
    await this.$store.dispatch("loadLanguages");
    }
  },
  created: function () {
    this.debounceInput = debounce(this.setInput, this.debounceTime);
    if (!this.initialized) {
     this.$router.push({name:"index"})
    }
  },
  computed: {
    mobileLayout() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    ...mapGetters({
      pairCodes: "getPairCodes",
      sourceLang: "getSourceLang",
      targetLang: "getTargetLang",
      sourceOptions: "getSourceOptions",
      targetOptions: "getTargetOptions",
      swapEnabled: "getSwapEnabled",
      input: "getInput",
      initialized: "getInitialized"
    }),
  },
  methods: {
    ...mapMutations(["swapLangs", "setInput"]),
  },
  watch: {
    pendingInput: function (newInput) {
      this.debounceInput(newInput);
    },
  },
};
</script>
