<template>
  <div class="info-pair">
    <p>{{ label }}</p>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "InfoPair",
  props: {
    label: null,
    value: null,
  },
};
</script>

<style scoped>

.info-pair {
  padding-left: 2px;
  color: #ccc;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
}
</style>
