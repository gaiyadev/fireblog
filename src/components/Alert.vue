<template>
  <v-alert border="left" dismissible @input="omClose" type="error">{{ text }}</v-alert>
</template>
<script>
export default {
  props: ["text"],
  data() {
    return {};
  },
  methods: {
    omClose() {
      this.$emit("dismissed");
    }
  }
};
</script>
