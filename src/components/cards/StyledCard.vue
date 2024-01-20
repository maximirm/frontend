<template>
  <div class="styled-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "StyledCard"
};
</script>

<style scoped>
.styled-card {
  border: 2px solid #666;
  cursor: pointer;
  transition: border-color 0.3s;
  display: flex;
  flex-direction: row;
}

.selected {
  background-color: #2e2e2e;
  color: #4CAF50;
  border-left: 4px solid #4CAF50;
}
</style>
