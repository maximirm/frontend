<template>
  <div class="styled-catalog">
    <slot></slot>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.styled-catalog {
  width: 500px;
  overflow-y: auto;
  height: 600px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
  flex-grow: 1;
}

.styled-catalog::-webkit-scrollbar {
  width: 8px;
}

.styled-catalog::-webkit-scrollbar-thumb {
  background-color: #555;
}

.styled-catalog::-webkit-scrollbar-thumb:hover {
  background-color: #777;
}
</style>
