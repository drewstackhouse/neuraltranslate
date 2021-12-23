<template>
  <v-row align="center" justify="center">
    <v-col cols="1"></v-col>
    <v-col>
      <v-card flat outlined tile class="ma-0 pa-0">
        <v-row class="text-center ma-0 pa-0" no-gutters>
          <v-col class="ma-0 pa-0" cols="5.5"
            ><v-btn
            @click="showSourceLangs = !showSourceLangs"
              x-large
              text
              tile
              block
              >{{ sourceLang.language }}</v-btn
            ></v-col
          >
          <v-col class="ma-0 pa-0" cols="1"
            ><v-btn x-large text tile block icon :disabled="!swapEnabled"
              ><v-icon>mdi-swap-horizontal</v-icon></v-btn
            ></v-col
          >
          <v-col class="ma-0 pa-0" cols="5.5"
            ><v-btn x-large text tile block>{{
              targetLang.language
            }}</v-btn></v-col
          >
        </v-row>
        <v-divider />
        <v-row class="text-center ma-0 pa-0" no-gutters style="height: 400px">
          <v-scroll-y-reverse-transition><v-col class="ma-0 pa-0" cols="12" v-if="showSourceLangs"><v-card flat tile height="100%">Hey</v-card></v-col></v-scroll-y-reverse-transition>
          <v-col class="ma-0 pa-0" cols="6" v-if="!showSourceLangs">
              <v-textarea
                rows="10"
                tile
                no-resize
                solo
                flat
                clearable
                class="text-h5 pa-3"
                placeholder="Start typing..."
                v-model="pendingInput"
              ></v-textarea>
          </v-col>
          <v-divider class="pa-0" vertical v-if="!showSourceLangs" />
          <v-col class="ma-0 pa-0" cols="6" v-if="!showSourceLangs">
            <v-textarea
              rows="10"
              tile
              no-resize
              solo
              flat
              class="text-h5 pa-3"
              placeholder="Translation"
              readonly
              :value="output"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="1"></v-col>
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
    langColumnLength: 4
  }),
  created: function () {
    this.debounceInput = debounce(
      this.dispatchSetInputAndTranslate,
      this.debounceTime
    );
  },
  computed: {
    ...mapGetters({
      sourceLang: "getSourceLang",
      targetLang: "getTargetLang",
      sourceOptions: "getSourceOptions",
      targetOptions: "getTargetOptions",
      swapEnabled: "getSwapEnabled",
      input: "getInput",
      output: "getOutput",
    }),
    sourceLangColumns() {
        if (this.targetOptions) {
            let columns = [];
            let sortedKeys = [...this.targetOptions].map(obj => obj.language).sort();
            
            let options = sortedKeys.map(key => this.targetOptions.filter(obj => obj.language === key)[0]);
            
            while (options.length) {
                columns.push(
                    options.splice(0, this.langColumnLength)
                );
                if (options.length) {
                    columns.push(["/"])
                }
            }
            return columns
        } else {
            return []
        }
    }
  },
  methods: {
    ...mapMutations(["swapLangs", "setInput", "setOutput"]),
    dispatchSetInputAndTranslate(inp) {
      this.$store.dispatch("setInputAndTranslate", inp);
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

<style>
</style>