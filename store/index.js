export const state = () => ({
    langIndex: null,
    availableLangs: null,
    sourceLang: null,
    sourceOptions: null,
    targetLang: null,
    targetOptions: null,
    swapEnabled: null,
    input: null
})

export const getters = {
    getSourceLang(state) {
        return state.sourceLang
    },
    getTargetLang(state) {
        return state.targetLang
    },
    getSwapEnabled(state) {
        return Object.keys(state.availableLangs).includes(state.targetLang.id) && state.availableLangs[state.targetLang.id].includes(state.sourceLang.id)
    },
    getSourceOptions(state) {
        return state.sourceOptions
    },
    getTargetOptions(state) {
        return state.targetOptions
    },
    getInput(state) {
        return state.input
    }
}

export const mutations = {
    setLangIndex(state, data) {
        state.langIndex = data
    },
    setAvailableLangs(state, data) {
        state.availableLangs = data
    },
    setSourceLang(state, langObj) {
        state.sourceLang = langObj;
    },
    setTargetLang(state, langObj) {
        state.targetLang = langObj;
    },
    setSourceOptions(state) {
        const sourceIds = Object.keys(state.availableLangs);
        let sourceObjs = [];
        for (var i = 0; i < sourceIds.length; i++) {
            var thisObj = state.langIndex.filter(obj => `${obj.id}` === sourceIds[i])[0];
            sourceObjs.push(thisObj);
        }
        state.sourceOptions = sourceObjs;
    },
    setTargetOptions(state) {
        const targetIds = state.availableLangs[state.sourceLang.id];
        let targetObjs = [];
        for (var i = 0; i < targetIds.length; i++) {
            var thisObj = state.langIndex.filter(obj => obj.id === targetIds[i])[0];
            targetObjs.push(thisObj);
        }
        state.targetOptions = targetObjs;
    },
    swapLangs(state) {
        [state.sourceLang, state.targetLang] = [state.targetLang, state.sourceLang];
    },
    setInput(state, input) {
        state.input = input;
    }
}

export const actions = {
    async loadLanguages({commit, dispatch, state}) {
        const res = await this.$axios.get('https://qp2dlboe9l.execute-api.us-east-1.amazonaws.com/prod');
        const data = JSON.parse(res.data.body);
        const langIndex = data.index.sort((a,b) => a.id - b.id);
        const availableLangs = data.available;

        commit('setLangIndex', langIndex);
        commit('setAvailableLangs', availableLangs);
        commit('setSourceOptions');

        const firstSourceId = Object.keys(availableLangs)[0];
        const firstSourceObj = langIndex[firstSourceId];

        const firstTargetId = availableLangs[firstSourceId][0];
        const firstTargetObj = langIndex[firstTargetId]
        
        const payload = {sourceObj:firstSourceObj, targetObj:firstTargetObj}
        await dispatch('updateLanguages', payload);
    },
    async updateLanguages({commit}, payload) {
        await commit('setSourceLang', payload.sourceObj);
        await commit('setTargetOptions');
        await commit('setTargetLang', payload.targetObj);
    }
}