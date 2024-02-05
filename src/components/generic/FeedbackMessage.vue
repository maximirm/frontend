<template>
  <div
      :class="messageType"
      v-show="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      required: true,
    }
  }
};
</script>

<style scoped>

.error {
  color: red;
}

.success {
  color: #1A237E;
}

</style>
