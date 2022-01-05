<template>
  <v-row align="center" justify="center">
    <v-col cols="12">    
    </v-col>
    <v-col cols="1"></v-col>
    <v-col>
      <v-card
        flat
        style="border: 2px solid #263238"
        tile
        class="ma-0 pa-0"
        v-if="sourceLang && targetLang"
      >
        <v-row class="text-center ma-0 pa-0" no-gutters>
          <v-col class="ma-0 pa-0" cols="5.5"
            ><v-btn
              @click="showSourceLangs = !showSourceLangs"
              x-large
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
              @click="showTargetLangs = !showTargetLangs"
              x-large
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
                    class="py-3 px-12"
                    @click="updateLangs(src, targetLang)"
                  >
                    {{ src.language }}
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
                    class="py-3 px-12"
                    @click="updateLangs(sourceLang, tgt)"
                  >
                    {{ tgt.language }}
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
            ></v-textarea>
            <v-row class="text-right mr-3">
              <v-col>
                <v-btn @click="copyToClipboard" large icon
                  ><v-icon>mdi-content-copy</v-icon></v-btn
                >
                <v-snackbar left v-model="copiedSnackbar" timeout="1000">
                  {{snackbarText}}
                </v-snackbar>
                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on" class="pa-0 ma-0">
                <v-btn color="amber darken-4" large icon disabled><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
                
                                <v-btn large icon disabled
                  ><v-icon>mdi-thumb-down-outline</v-icon></v-btn
                >

                
                <v-btn large icon disabled
                  ><v-icon>mdi-share-variant-outline</v-icon></v-btn
                >
                
                </span></template>
                <span>Features coming soon!</span></v-tooltip>

              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="1"></v-col>
    <v-col cols="12"></v-col>
    <v-col cols="12"></v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { debounce } from "lodash";

export default {
  data: () => ({
    pendingInput: "",
    debounceTime: 100,
    showSourceLangs: false,
    showTargetLangs: false,
    copiedSnackbar: false,
    snackbarText: "",
  }),
  created: function () {
    this.debounceInput = debounce(
      this.dispatchSetInputAndTranslate,
      this.debounceTime
    );
    //this.warmLambdas = setInterval(this.dispatchInitTranslate, 30000);
  },
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
      history: "getHistory"
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
  methods: {
    ...mapMutations(["swapLangs", "setInput", "setOutput"]),
    dispatchSetInputAndTranslate(inp) {
      this.$store.dispatch("setInputAndTranslate", inp);
    },
    dispatchSwapLangsAndTranslate() {
      this.swapLangs();
      this.pendingInput = this.output;
      this.dispatchSetInputAndTranslate(this.output);
    },
    async updateLangs(source, target) {
      const payload = {
        sourceObj: source,
        targetObj: target,
      };
      await this.$store.dispatch("updateLanguages", payload);
      if (this.pendingInput) {
      this.dispatchSetInputAndTranslate(this.input);
      };
      this.showSourceLangs = false;
      this.showTargetLangs = false;
    },
    dispatchInitTranslate() {
      this.$store.dispatch("initTranslate");
    },
    copyToClipboard() {
      if (this.output) {
      navigator.clipboard
        .writeText(this.output)
        .then(() => {
          this.snackbarText = "Translation copied to clipboard"
          this.copiedSnackbar = true;
        })
        .catch((err) => {
          this.snackbarText = "Sorry, we can't copy that right now."
          this.copiedSnackbar = true;
        });
    } else {
      this.snackbarText = "Nothing to copy.";
      this.copiedSnackbar = true;
    }
  },
},
  watch: {
    pendingInput: function (newInput) {
      if (newInput) {
        this.debounceInput(newInput);
      } else {
        this.setOutput("");
      }
    },
  },
};
</script>

<style></style>
