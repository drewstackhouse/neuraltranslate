<template>
    <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
        <v-card tile elevation="5" v-if="sl['language']">
            <v-menu offset-y close-on-content-click transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" x-large text tile color="primary"><span>{{sl["language"]}}<v-icon
                                class="ml-3">mdi-chevron-down</v-icon></span>
                    </v-btn>
                </template>
                <v-list style="max-height: 500px" class="overflow-y-auto">
                    <v-list-item :disabled="typing||lang.language === sl.language" v-for="(lang, i) in languages"
                        :key="i" :value="lang" @click="handleSetSl(lang)">
                        <v-list-item-title>{{lang.language}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-textarea spellcheck="false" autofocus solo flat dense clearable
                class="text-h6 font-weight-regular mx-3 rounded-0" v-model="preInput" no-resize>
            </v-textarea>
            <v-card-actions>
                <v-btn icon color="primary" @click="swapLangs">
                    <v-icon>mdi-swap-horizontal</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn text disabled>
                    <span>{{ preInput ? preInput.length : 0 }}</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    created: function () {
        this.debounceInput = this.debounce(
            this.doTranslate
        );
    },
    data: () => ({
        preInput: '',
    }),
    computed: {
        ...mapGetters({
            "sl": "getSl",
            "tl": "getTl",
            "query": "getQuery",
            "translation": "getTranslation",
            "languages": "getLanguages",
            "typing": "getTyping"
        }),

    },
    methods: {
        ...mapActions([
            "doTranslate"
        ]),
        ...mapMutations([
            "setSl",
            "setTl",
            "setQuery",
            "setTranslation",
            "setLanguages",
            "setTyping"
        ]),
        swapLangs() {
            const sourceLang = this.sl;
            const targetLang = this.tl;

            this.setSl(targetLang);
            this.setTl(sourceLang);

            this.preInput = this.translation.final.translation;
        },
        debounce(func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            }
        },
        handleSetSl(val) {
            if (val === this.tl) {
                this.setTl(this.sl);
            }
            this.setSl(val);
            this.preInput = "";
        },
        /*async doTranslation(val) {

            const pivotResults = {}

            const src = this.sl["code"];
            const tgt = this.tl["code"];

            if (![src, tgt].includes("en")) {

                const pivotOne = `${src}en`;
                const pivotTwo = `en${tgt}`;

                var pivotToEn = await this.$repositories.translations.get(`${pivotOne}?text=${val}`);
                pivotToEn = pivotToEn["data"];
                pivotResults["pivot"] = pivotToEn;

                var pivotFromEn = await this.$repositories.translations.get(`${pivotTwo}?text=${pivotToEn["translation"]}`);
                pivotFromEn = pivotFromEn["data"];
                pivotResults["result"] = pivotFromEn;

                this.setTranslation(pivotResults);

            } else {

                let res = await this.$repositories.translations.get(`${this.sl["code"]}${this.tl["code"]}?text=${val}`);
                res = res["data"];
                this.setTranslation({ result: res });
            }
            this.setTyping(false);
        }*/
    },

    watch: {
        preInput(val) {

            // should pass new input to store each time, immediately.
            this.setQuery(val);

            // if new input is truthy (i.e. was not a "clear" event),
            // set typing = true and begin input debounce. Otherwise
            // we treat as "clear" event (i.e. typing = false) and we
            // can immediately treat new output as empty string.

            if (val) {
                this.setTyping(true);
                this.debounceInput(val);
            } else {
                this.setTranslation(
                    {
                        pivot: {},
                        final: {
                            translation: ""
                        }
                    }
                )
            }
        }
    }
}
</script>