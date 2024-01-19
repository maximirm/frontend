<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
  </div>
</template>

<script>
export default {
  props: {
    progressBarWidth: String,
  },
};
</script>

<style scoped>
.progress-bar-container {
  margin-top: 20px;
  height: 10px;
  background-color: #eee;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease-in-out;
}
</style>
