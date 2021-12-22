<template>
  <translator />
</template>

<script>

import Translator from "../components/Translator.vue";

export default {
  components: {
    Translator,
  }
}
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