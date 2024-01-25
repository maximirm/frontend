<template>

  <v-progress-linear
      :model-value="progressBarWidth"
      bg-color="light-green-darken-4"
      color="blue-grey"
      height="25"
      rounded

  ></v-progress-linear>

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
