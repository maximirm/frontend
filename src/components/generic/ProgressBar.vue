<template>
  <v-progress-linear
      :model-value="progressBarWidth"
      bg-color="light-green-darken-4"
      color="'rgba(67, 154, 217, 0.5)'"
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

