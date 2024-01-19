<template>
  <button @click="handleClick" class="button" :disabled="isDisabled">{{ buttonText }}</button>
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
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      if (!this.isDisabled) {
        this.clickHandler();
      }
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
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #444;
}

.button:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
