<template>
  <v-row>
      <v-col>
          <v-textarea v-model="input"></v-textarea>
          <v-btn>Translate</v-btn>
          <br><br><br>
      </v-col>
  </v-row>
</template>

<script>
export default {
    data: () => ({
        input: "",
        translation: "",
        batchRes: null,
    }),
    methods: {

    },
    computed: {

    }
}
</script>

<style>

</style>