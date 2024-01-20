<template>
  <div class="button-group">
    <StyledButton
        v-for="button in buttons"
        :key="button.text"
        :label="button.text"
        :onClickMethod="button.clickHandler"/>
  </div>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";

export default {
  name: 'GroupedButtons',
  components: {
    StyledButton,
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
  justify-content: flex-start;
}

</style>
