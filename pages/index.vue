<template>
<v-container>
  <v-card elevation="8" class="mt-12 mx-0 px-0" tile>
    <v-row justify="center" align="center" no-gutters class="mx-0">
      <v-col cols="5.5">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="rgba(0,0,0,0)"
              elevation="0"
              x-large
              height="75"
              tile
              block
              class="lang-btn text-h6 font-weight-bold lang-btn"
              >{{ sourceLang ? sourceLang.language : ""
              }}<v-icon v-if="sourceLang" class="ml-3"
                >mdi-chevron-down</v-icon
              ></v-btn
            >
          </template>
          <v-list>
            <v-list-item-group>
            <v-list-item v-for="(option, i) in sourceOptions" :key="i" :value="option">{{option.language}}</v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="1">
        <v-btn
        height="75"
          :disabled="!swapEnabled"
          @click="swapLangs"
          v-if="sourceLang && targetLang"
          color=""
          elevation="0"
          x-large
          text
          tile
          block
          ><v-icon x-large>mdi-swap-horizontal</v-icon></v-btn
        >
      </v-col>
      <v-col cols="5.5">
                <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-bind="attrs"
        v-on="on"
        height="75"
          color="rgba(0,0,0,0)"
          elevation="0"
          x-large
          tile
          block
          class="lang-btn text-h6 font-weight-bold"
          >{{ targetLang ? targetLang.language : ""
          }}<v-icon v-if="targetLang" class="ml-3"
            >mdi-chevron-down</v-icon
          ></v-btn
        >
                  </template>
          <v-list>
            <v-list-item-group>
            <v-list-item v-for="(option, i) in targetOptions" :key="i" :value="option">{{option.language}}</v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider />
    <v-row justify="center" align="center" class="mx-0">
      <v-col cols="6" class="px-0">
        <v-row no-gutters class="">
          <v-col cols="12">
            <v-textarea
              placeholder="Start typing..."
              v-model="pendingInput"
              id="inputArea"
              rows="15"
              clearable
              tile
              no-resize
              solo
              flat
              class="text-h5 pa-1"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn icon class="ma-1"><v-icon></v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-divider vertical inset class="mt-3" />
      <v-col cols="6" class="px-0">
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
              :value="input"
              readonly
              rows="15"
              tile
              no-resize
              solo
              flat
              class="text-h5 pa-1"
              placeholder="Translation"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="text-right">
            <v-btn icon class="my-1 mx-2"
              ><v-icon large>mdi-thumb-up-outline</v-icon></v-btn
            >
            <v-btn icon class="my-1 mx-2"
              ><v-icon large>mdi-thumb-down-outline</v-icon></v-btn
            >
            <v-btn icon class="my-1 mx-2"><v-icon large>mdi-content-copy</v-icon></v-btn>
            <v-btn icon class="my-1 mx-2"><v-icon large>mdi-share-variant</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</v-container>

</template>

<script>

import { mapGetters, mapMutations } from "vuex";
import { debounce } from "lodash";

export default {
  async beforeCreate() {
    await this.$store.dispatch("loadLanguages");
  },

  data: () => ({
    showMenu: true,
    pendingInput: '',
    debounceTime: 100
  }),
  created: function () {
    this.debounceInput = debounce(this.setInput, this.debounceTime)
  },
  computed: {
    ...mapGetters({
      sourceLang: "getSourceLang",
      targetLang: "getTargetLang",
      sourceOptions: "getSourceOptions",
      targetOptions: "getTargetOptions",
      swapEnabled: "getSwapEnabled",
      input: "getInput",
    }),
    output() {
      if (this.input) {
        let parts = this.input.split(/(?<=[\.\?\!]\s+)/);
        parts = parts.filter((x) => x.trim());
        return parts.join("\n");
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapMutations(["swapLangs","setInput"]),
  },
  watch: {
    pendingInput: function (newInput) {
      this.debounceInput(newInput)
    }
  }
};
</script>

<style>

.v-card {
  border: 0px solid #284b63;
}

.v-btn {
  text-transform: none;
}

::selection {
  background: #f07167;
  color: #fff
}

</style>