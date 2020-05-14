<template>
  <v-alert
    border="left"
    class="animate__animated animate__wobble"
    dismissible
    transition="fade-transition"
    @input="onClose"
    type="error"
  >{{ text }}</v-alert>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {};
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script> 