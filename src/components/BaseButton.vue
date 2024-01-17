<template>
  <button @click="handleClick" class="button">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    clickHandler: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.clickHandler();
    },
  },
};
</script>

<style scoped>
.button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
}

.button:hover {
  background-color: #444;
}
</style>
