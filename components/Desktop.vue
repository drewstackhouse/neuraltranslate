<template>
  <v-container fluid fill-height class="mt-12">
    <v-row align="center" justify="center">
      <v-col cols="1"></v-col>
      <v-col>
        <v-card
          elevation="8"
          outlined
          tile
          class="ma-0 pa-0"
          v-if="sourceLang && targetLang"
        >
          <v-row class="text-center ma-0 pa-0" no-gutters>
            <v-col class="ma-0 pa-0" cols="5.5"
              ><v-btn
                @click="
                  showTargetLangs = false;
                  showSourceLangs = true;
                "
                x-large
                class="text-h6 font-weight-regular text-capitalize"
                text
                tile
                block
                :color="showSourceLangs ? 'amber darken-4' : ''"
                >{{
                  showSourceLangs ? "Select Language" : sourceLang.language
                }}</v-btn
              ></v-col
            >
            <v-col class="ma-0 pa-0" cols="1"
              ><v-btn
                x-large
                text
                tile
                block
                icon
                :disabled="!swapEnabled"
                color="amber darken-4"
                @click="dispatchSwapLangsAndTranslate"
                ><v-icon>mdi-swap-horizontal</v-icon></v-btn
              ></v-col
            >
            <v-col class="ma-0 pa-0" cols="5.5"
              ><v-btn
                @click="
                  showSourceLangs = false;
                  showTargetLangs = true;
                "
                x-large
                class="text-h6 font-weight-regular text-capitalize"
                text
                tile
                block
                :color="showTargetLangs ? 'amber darken-4' : ''"
                >{{
                  showTargetLangs ? "Select Language" : targetLang.language
                }}</v-btn
              ></v-col
            >
          </v-row>
          <v-divider />
          <v-row class="text-center ma-0 pa-0" no-gutters style="height: 400px">
            <v-col class="ma-0 pa-0" cols="12" v-if="showSourceLangs">
              <v-card flat tile height="100%" class="text-left">
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(src, i) in sourceOptions"
                      :key="i"
                      class="py-2 px-12"
                      @click="updateLangs(src, targetLang)"
                    >
                      <v-row>
                        <v-col cols="1">
                          <v-icon v-if="src === sourceLang">mdi-check</v-icon>
                        </v-col>
                        <v-col
                          ><span>{{ src.language }}</span></v-col
                        >
                      </v-row>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col class="ma-0 pa-0" cols="12" v-else-if="showTargetLangs">
              <v-card flat tile height="100%" class="text-left">
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(tgt, i) in targetOptions"
                      :key="i"
                      class="py-2 px-12"
                      @click="updateLangs(sourceLang, tgt)"
                    >
                      <v-row>
                        <v-col cols="1">
                          <v-icon v-if="tgt === targetLang">mdi-check</v-icon>
                        </v-col>
                        <v-col
                          ><span>{{ tgt.language }}</span></v-col
                        >
                      </v-row>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col
              class="ma-0 pa-0"
              cols="6"
              v-if="!showSourceLangs && !showTargetLangs"
            >
              <v-textarea
                rows="10"
                tile
                no-resize
                solo
                flat
                class="text-h5 pa-3"
                clearable
                placeholder="Start typing..."
                v-model="pendingInput"
              >
              </v-textarea>
              <v-row>
                <v-col> </v-col>
              </v-row>
            </v-col>
            <v-divider
              style="z-index: 0; position: relative"
              class="pa-0"
              vertical
              v-if="!showSourceLangs && !showTargetLangs"
            />
            <v-col
              :class="output ? 'grey lighten-4 ma-0 pa-0' : 'ma-0 pa-0'"
              cols="6"
              v-if="!showSourceLangs && !showTargetLangs"
            >
              <v-textarea
                rows="10"
                tile
                no-resize
                solo
                flat
                class="text-h5 pa-3"
                background-color="transparent"
                placeholder="Translation"
                readonly
                :value="output"
              >
                <template slot="append-outer">
                  <v-progress-circular
                    indeterminate
                    v-if="typing"
                    color="amber darken-4"
                  ></v-progress-circular>
                </template>
              </v-textarea>
              <v-row class="text-right mr-3">
                <v-col>
                  <v-btn @click="copyToClipboard" large icon
                    ><v-icon color="amber darken-4"
                      >mdi-content-copy</v-icon
                    ></v-btn
                  >
                  <v-snackbar
                    bottom
                    v-model="copiedSnackbar"
                    timeout="1000"
                    color="rgba(255, 111, 0, 0.5)"
                    class="font-weight-bold"
                  >
                    <span class="text-h5 ma-3">{{ snackbarText }}</span>
                  </v-snackbar>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on" class="pa-0 ma-0">
                        <v-btn color="amber darken-4" large icon disabled
                          ><v-icon>mdi-thumb-up-outline</v-icon></v-btn
                        >

                        <v-btn large icon disabled
                          ><v-icon>mdi-thumb-down-outline</v-icon></v-btn
                        >

                        <v-btn large icon disabled
                          ><v-icon>mdi-share-variant-outline</v-icon></v-btn
                        >
                      </span></template
                    >
                    <span>Features coming soon!</span></v-tooltip
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { debounce } from "lodash";

export default {

  // DATA ------------------------------------------------------------------
  data: () => ({
    typing: false,
    pendingInput: "",
    debounceTime: 250,
    showSourceLangs: false,
    showTargetLangs: false,
    copiedSnackbar: false,
    snackbarText: "",
  }),

  // LIFECYCLE HOOKS --------------------------------------------------------------
  created: function () {
    this.debounceInput = debounce(
      this.dispatchSetInputAndTranslate,
      this.debounceTime
    );
    //this.warmLambdas = setInterval(this.dispatchInitTranslate, 30000);
  },

  // COMPUTED PROPERTIES ---------------------------------------------------------
  computed: {
    ...mapGetters({
      availableLangs: "getAvailableLangs",
      sourceLang: "getSourceLang",
      targetLang: "getTargetLang",
      sourceOptions: "getSourceOptions",
      targetOptions: "getTargetOptions",
      input: "getInput",
      output: "getOutput",
      pairCodes: "getPairCodes",
      history: "getHistory",
    }),
    swapEnabled() {
      return (
        Object.keys(this.availableLangs).includes(
          this.targetLang.id.toString()
        ) &&
        this.availableLangs[this.targetLang.id].includes(this.sourceLang.id)
      );
    },
  },

  // METHODS ------------------------------------------------------------------
  methods: {
    ...mapMutations(["swapLangs", "setInput", "setOutput"]),
    dispatchSetInputAndTranslate(inp) {
      this.typing = false;
      this.$store.dispatch("setInputAndTranslate", inp);
    },
    dispatchSwapLangsAndTranslate() {
      this.swapLangs();
      this.pendingInput = this.output;
      this.dispatchSetInputAndTranslate(this.output);
    },

    /*
    This method will dispatch updateLanguages action in store, which
    will apply any changes made to source or target language selections.
    Invoked whenever user selects new source or target language. Upon
    fulfilled promise, if pendingInput is not empty, existing input text
    will automatically be translated according to new languages. Finally,
    any open dialog windows for updating languages are closed.
    */
    async updateLangs(source, target) {
      const payload = {
        sourceObj: source,
        targetObj: target,
      };
      await this.$store.dispatch("updateLanguages", payload);
      if (this.pendingInput) {
        this.dispatchSetInputAndTranslate(this.input);
      }
      this.showSourceLangs = false;
      this.showTargetLangs = false;
    },

    /*
    This method will dispatch initTranslate action in store, which
    fires off dummy API calls to invoke all available translator
    lambdas. Only called if this.warmLambdas is used to periodically
    invoke this function via setInterval.
    */
    dispatchInitTranslate() {
      this.$store.dispatch("initTranslate");
    },

    /*
    Simple function to copy text from output textarea to clipboard.
    Called whenever clipboard icon in output textarea is clicked.
    */
    copyToClipboard() {
      if (this.output) {
        navigator.clipboard
          .writeText(this.output)
          .then(() => {
            this.snackbarText = "Translation copied to clipboard!";
            this.copiedSnackbar = true;
          })
          .catch((err) => {
            this.snackbarText = "Sorry, we can't copy that right now.";
            this.copiedSnackbar = true;
          });
      } else {
        this.snackbarText = "Nothing to copy.";
        this.copiedSnackbar = true;
      }
    },
  },

  // WATCHED PROPERTIES -------------------------------------------------------------
  watch: {
    /*
    When pendingInput changes, if the new value is not null 
    (meaning it was not a clear textarea event), then set 
    typing to true to indicate progress to user via v-progress-circular
    component, then initiate debounce period using debounceInput
    function, which was initialized on created() lifecycle hook.
    debounceInput will dispatch 'setInputAndTranslate' action from
    store.
    */
    pendingInput: function (newInput) {
      if (newInput) {
        this.typing = true;
        this.debounceInput(newInput);
      } else {
        this.setOutput("");
      }
    },
  },
};
</script>

<style></style>
