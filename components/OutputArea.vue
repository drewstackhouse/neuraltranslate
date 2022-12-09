<template>
    <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
        <v-card tile :color="cardColor" elevation="5" v-if="tl['language']">
            <v-menu offset-y close-on-content-click transition="slide-y-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" x-large text tile color="primary"><span>{{tl["language"]}}<v-icon
                                class="ml-3">mdi-chevron-down</v-icon></span>
                    </v-btn>
                </template>
                <v-list style="max-height: 500px" class="overflow-y-auto">
                    <v-list-item :disabled="typing||lang.language === tl.language" v-for="(lang, i) in languages"
                        :key="i" :value="lang" @click="handleSetTl(lang)">
                        <v-list-item-title>{{lang.language}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-textarea spellcheck="false" solo flat dense class="text-h6 font-weight-regular rounded-0 mx-3"
                :background-color="cardColor" readonly
                :value="translation['final']['translation'] ? translation['final']['translation'] : []" no-resize>
                <template slot="append">
                    <v-progress-circular color="primary" indeterminate v-if="typing"></v-progress-circular>
                </template>
            </v-textarea>
            <v-card-actions>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon class="ma-1" color="primary" v-bind="attrs" v-on="on">
                            mdi-information-outline</v-icon>
                    </template>
                    <span>
                        <span v-for="(item,i) in parametersAsText" :key="i" :value="item">
                            {{item[0]}}: {{item[1]}}
                            <br>
                        </span>
                    </span>
                </v-tooltip>
                <v-spacer />
                <v-btn icon color="primary">
                    <v-icon>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn icon color="primary">
                    <v-icon>mdi-thumb-up-outline</v-icon>
                </v-btn>
                <v-btn icon color="primary">
                    <v-icon>mdi-thumb-down-outline</v-icon>
                </v-btn>
                <v-btn icon color="primary">
                    <v-icon>mdi-share-variant</v-icon>
                </v-btn>
                <v-btn icon color="primary">
                    <v-icon>mdi-brain</v-icon>
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-col>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    methods: {
        ...mapActions([
            "doTranslate"
        ]),
        ...mapMutations([
            "setSl",
            "setTl",
            "setTyping",
        ]),
        handleSetTl(val) {
            if (val === this.sl) {
                this.setSl(this.tl);
            }
            this.setTl(val);
            if (this.query) {
                this.setTyping(true);
                this.doTranslate();
            }

        }
    },
    computed: {
        ...mapGetters({
            "sl": "getSl",
            "tl": "getTl",
            "translation": "getTranslation",
            "languages": "getLanguages",
            "parameters": "getParameters",
            "typing": "getTyping",
            "query": "getQuery"
        }),
        cardColor() {
            return !this.translation['final']['translation'] ? '' : this.$vuetify.theme.dark ? '#171717' : 'grey lighten-3'
        },
        parametersAsText() {
            const params = this.parameters.filter(x => x.name === `${this.sl.code}${this.tl.code}`)[0];
            if (params) {
                let entries = Object.entries(params);
                return entries.sort((a, b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0))
            } else {
                return [[]]
            }
        }
    }
}
</script>
