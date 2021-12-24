<template>
  <v-container fluid fill-height v-if="showIntro">
    <v-row align="center" justify="center"></v-row>
    <v-row align="center" justify="center">
      <v-col cols="1"></v-col>
      <v-col :cols="mobile ? 12 : 3" class="text-center">
        <!--<v-card color="red accent-1" height="75"></v-card>-->
        <v-img src="neuraltranslate.png" max-width="200" class="mx-auto" />
      </v-col>
      <v-col :cols="mobile ? 12 : ''" class="text-center">
        <span :class="mobile ? 'text-h3' : 'text-h2'">Neural Translate</span>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col :cols="mobile ? 1 : 2"></v-col>
      <v-col class="text-center">
        <v-carousel
          reverse
          cycle
          hide-delimiters
          :show-arrows="false"
          interval="2500"
          touchless
          :height="mobile ? 75 : 100"
        >
          <v-carousel-item v-for="(msg, i) in messages" :key="i">
            <p
              :class="
                mobile
                  ? 'text-h6 mb-12 font-weight-regular text--secondary'
                  : 'text-h4 mb-12 text--secondary'
              "
            >
              {{ msg }}
            </p>
          </v-carousel-item>
        </v-carousel>
        <v-progress-linear
          height="20"
          rounded
          indeterminate
          color="red accent-1"
        ></v-progress-linear>
      </v-col>
      <v-col :cols="mobile ? 1 : 2"></v-col>
    </v-row>
    <v-row align="center" justify="center"></v-row>
    <v-card flat height="100" v-if="mobile"></v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data: () => ({
    showIntro: false,
    messages: [
      "Starting application...",
      "Cychwyn cais ...",
      "Запуск приложения ...",
      "애플리케이션 시작 중...",
      "Iniciando aplicativo ...",
    ],
  }),
  computed: {
    ...mapGetters({
      pairCodes: "getPairCodes",
      initialized: "getInitialized"
    }),
    mobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },
  methods: {
    ...mapMutations([
      "setInitialized"
    ]),
    sleep(ms) {
      return new Promise((res) => setTimeout(res, ms));
    },
  },

  async beforeCreate() {
    await this.$store.dispatch("loadLanguages");
  },

  async created() {
    await this.sleep(500);
    this.showIntro = true;
    await this.$store.dispatch('initTranslate');
    await this.setInitialized(true);
    this.$router.push({ name: "translate" });
  },
};
</script>

<style>
</style>