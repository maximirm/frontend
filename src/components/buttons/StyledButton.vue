<template>
  <button
      @click="handleClick"
      class="button"
      :disabled="isDisabled">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "StyledButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    onClickMethod: {
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
        this.onClickMethod();
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

.respond-survey-btn {
  background-color: #4CAF50;
}

.respond-survey-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.delete-btn {
  background-color: #d32f2f;
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.respond-btn {
  background-color: #4CAF50;
  margin-top: 10px;
}

.respond-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
