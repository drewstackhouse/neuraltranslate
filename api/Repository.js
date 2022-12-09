export default $axios => resource => ({
    get(query) {
        return $axios.get(`${$axios.defaults.baseURL}/${resource}/${query}`)
    }
})


