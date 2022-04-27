<template>
  <v-container fluid fill-height v-if="showIntro">
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <span :class="mobile ? 'text-h5 font-weight-regular' : 'text-h3 font-weight-light'"><v-icon :style="mobile ? 'font-size: 30px' : 'font-size: 50px'" color="amber darken-4" :class="mobile ? 'pr-3 mb-2' : 'pr-6 mb-2'">mdi-translate</v-icon>Neural Translate</span>
      </v-col>
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
        <v-progress-circular :size="mobile ? 100 : 200"
          width="5"
          indeterminate
          color="amber darken-4"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row align="center" justify="center"></v-row>
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
    
    async dispatchInitTranslate() {
      await this.$store.dispatch('initTranslate')
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

    //this.refresher = setInterval(this.dispatchInitTranslate, 30000)
  },
};
</script>

<style>
</style>