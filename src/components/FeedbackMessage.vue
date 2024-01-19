<template>

  <div :class="messageClass" v-if="message" >{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    messageClass: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped>
.error{
  color: red;
  margin-top: 10px;
}

.success{
  color: green;
  margin-top: 10px;
}

</style>
