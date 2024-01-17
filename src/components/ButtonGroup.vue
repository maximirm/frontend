<template>
  <div class="button-group">
    <BaseButton v-for="button in buttons" :key="button.text" :buttonText="button.text" :clickHandler="button.clickHandler" />
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.button-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start; /* Hier hinzugefügt */
}

</style>
