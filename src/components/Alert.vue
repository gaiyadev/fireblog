<template>
  <v-alert
    border="left"
    class="animate__animated animate__wobble"
    dismissible
    transition="fade-transition"
    :value="alert"
    @input="omClose"
    type="error"
  >{{ text }}</v-alert>
</template>
<script>
export default {
  props: ["text"],
  data() {
    return {
      alert: true
    };
  },

  methods: {
    omClose() {
      this.$emit("dismissed");
    },

    hide_alert() {
      console.log("Hide");
      // `event` is the native DOM event
      setTimeout(function() {
        var v = this;
        v.alert = false;
        console.log("hide alert after 3 seconds");
      }, 3000);
    },
    mounted() {
      if (alert) {
        this.hide_alert();
      }
    }
  }
};
</script>
