<template>
  <div class="feedback-message-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FeedbackMessageWrapper'
};
</script>

<style scoped>

.feedback-message-wrapper {
  min-height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
