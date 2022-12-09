export const state = () => ({
    sl: {},
    tl: {},
    query: "",
    translation: {
        pivot: {
            translation: null
        },
        final: {
            translation: null
        }
    },
    languages: [],
    parameters: [],
    typing: false,
})

export const getters = {
    getSl(state) {
        return state.sl
    },
    getTl(state) {
        return state.tl
    },
    getQuery(state) {
        return state.query
    },
    getTranslation(state) {
        return state.translation
    },
    getLanguages(state) {
        return state.languages
    },
    getParameters(state) {
        return state.parameters
    },
    getTyping(state) {
        return state.typing
    }
}

export const mutations = {
    setSl(state, sl) {
        state.sl = sl
    },
    setTl(state, tl) {
        state.tl = tl
    },
    setQuery(state, query) {
        state.query = query
    },
    setTranslation(state, translation) {
        state.translation = translation
    },
    setLanguages(state, languages) {
        state.languages = languages
    },
    setParameters(state, parameters) {
        state.parameters = parameters
    },
    setTyping(state, typing) {
        state.typing = typing
    }
}

export const actions = {
    async doTranslate({ state, commit }, val) {

        if (!val) {
            val = state.query
        }

        const slCode = state.sl["code"]
        const tlCode = state.tl["code"]

        // pivot required
        if (slCode !== "en" && tlCode !== "en") {
            const pivotRes = await this.$repositories.translations.get(`${slCode}en?text=${val}`);
            const pivotData = pivotRes["data"];
            commit('setTranslation', { pivot: pivotData, final: { translation: null } });

            const pivotText = pivotData["translation"];
            const finalRes = await this.$repositories.translations.get(`en${tlCode}?text=${pivotText}`);
            const finalData = finalRes["data"];
            commit('setTranslation', { pivot: pivotData, final: finalData });
            commit('setTyping', false)
        }

        // pivot not required
        else {

            const res = await this.$repositories.translations.get(`${slCode}${tlCode}?text=${val}`);
            const data = res["data"];
            commit('setTranslation', { pivot: null, final: data });
            commit('setTyping', false);
        }
    }
}