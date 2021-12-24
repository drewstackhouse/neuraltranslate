export const state = () => ({
  langIndex: null,
  availableLangs: null,
  sourceLang: null,
  sourceOptions: null,
  targetLang: null,
  targetOptions: null,
  pairCodes: null,
  input: null,
  output: null,
  initialized: false,
});

export const getters = {
  getInitialized(state) {
    return state.initialized
  },
  getLangIndex(state) {
    return state.langIndex;
  },
  getAvailableLangs(state) {
    return state.availableLangs;
  },
  getSourceLang(state) {
    return state.sourceLang;
  },
  getTargetLang(state) {
    return state.targetLang;
  },
  getPairCodes(state) {
    return state.pairCodes;
  },
  getSourceOptions(state) {
    return state.sourceOptions;
  },
  getTargetOptions(state) {
    return state.targetOptions;
  },
  getInput(state) {
    return state.input;
  },
  getOutput(state) {
    return state.output;
  },
};

export const mutations = {
  setInitialized(state, value) {
    state.initialized = value
  },
  setLangIndex(state, data) {
    state.langIndex = data;
  },
  setAvailableLangs(state, data) {
    state.availableLangs = data;
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
      var thisObj = state.langIndex.filter(
        (obj) => `${obj.id}` === sourceIds[i]
      )[0];
      sourceObjs.push(thisObj);
    }
    state.sourceOptions = sourceObjs;
  },
  setTargetOptions(state) {
    const targetIds = state.availableLangs[state.sourceLang.id];
    let targetObjs = [];
    for (var i = 0; i < targetIds.length; i++) {
      var thisObj = state.langIndex.filter((obj) => obj.id === targetIds[i])[0];
      targetObjs.push(thisObj);
    }
    state.targetOptions = targetObjs;
  },
  setPairCodes(state, pairCodes) {
    state.pairCodes = pairCodes;
  },
  swapLangs(state) {
    [state.sourceLang, state.targetLang] = [state.targetLang, state.sourceLang];
  },
  setInput(state, input) {
    state.input = input;
  },
  setOutput(state, output) {
    state.output = output;
  },
};

export const actions = {

  async setInputAndTranslate({ commit, dispatch}, input) {
    await commit('setInput', input);
    if (input) {
    await dispatch('translateInput');
    }
  },
  async loadLanguages({ commit, dispatch }) {
    const res = await this.$axios.get(
      "https://qp2dlboe9l.execute-api.us-east-1.amazonaws.com/prod"
    );
    const data = JSON.parse(res.data.body);
    const langIndex = data.index.sort((a, b) => a.id - b.id);
    const availableLangs = data.available;

    commit("setLangIndex", langIndex);
    commit("setAvailableLangs", availableLangs);
    commit("setSourceOptions");

    const firstSourceId = Object.keys(availableLangs)[0];
    const firstSourceObj = langIndex[firstSourceId];

    const firstTargetId = availableLangs[firstSourceId][0];
    const firstTargetObj = langIndex[firstTargetId];

    const payload = { sourceObj: firstSourceObj, targetObj: firstTargetObj };
    await dispatch("updateLanguages", payload);
    await dispatch("loadPairCodes");
  },
  async updateLanguages({ commit }, payload) {
    await commit("setSourceLang", payload.sourceObj);
    await commit("setTargetOptions");
    await commit("setTargetLang", payload.targetObj);
  },

  async loadPairCodes({ commit, state }) {
    let pairCodes = [];
    for (var i = 0; i < state.sourceOptions.length; i++) {
      let currentSourceId = state.sourceOptions[i].id;
      let currentSourceCode = state.sourceOptions[i].code;
      let currentTargetIds = state.availableLangs[currentSourceId];
      let currentTargetCodes = currentTargetIds.map(
        (x) => state.langIndex.filter((y) => y.id === x)[0].code
      );
      currentTargetCodes.forEach((tar) =>
        pairCodes.push(`${currentSourceCode}${tar}`)
      );
    }
    await commit("setPairCodes", pairCodes);
  },

  async translateInput({ commit, dispatch, state }) {
    const input = state.input;
    const pair = `${state.sourceLang.code}${state.targetLang.code}`;
    //const requestURL = `${this.$axios.defaults.baseURL}${pairCode}?text=${input}`

    //try {
    //  const res = await this.$axios.get(requestURL);
    //  const translation = res.data.translation;
    //  commit('setOutput', translation)
    //} catch (e) {
    //  console.error(`Something went wrong: ${e}`);
     // return "";
    //}
    const payload = {text:input, pairCode:pair};
    const translation = await dispatch('translate', payload);
    commit('setOutput', translation)
  },

  async translate({state}, payload) {
    const input = payload.text;
    const pairCode = payload.pairCode;
    const requestURL = `${this.$axios.defaults.baseURL}${pairCode}?text=${input}`

    try {
      const res = await this.$axios.get(requestURL);
      const translation = res.data.translation;
      return translation
    } catch (e) {
      console.error(`Something went wrong: ${e}`);
      return "";
    }
  },

  async initTranslate({dispatch, state}) {
    
    try {
      const startTime = Date.now();
      const translations = state.pairCodes.map(async (code) =>
        {
          let payload = {text:"Hello.", pairCode:code};
          dispatch('translate', payload)
        }
      );
      await Promise.all(translations);
      const endTime = Date.now();
      console.log(
        `Round-trip initialization took ${
          (endTime - startTime) / 1000
        } seconds.`
      );
    } catch (e) {
      console.error(`Something went wrong during initialization: ${e}`);
    }
  },
};
