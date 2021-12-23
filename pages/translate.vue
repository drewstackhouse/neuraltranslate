<template>
  <v-container fluid fill-height>
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
  created: function () {
    this.debounceInput = debounce(this.setInput, this.debounceTime);
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
