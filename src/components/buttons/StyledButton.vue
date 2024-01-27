<template>
  <v-btn
      variant="tonal"
      size="large"
      :width="width"
      @click="handleClick"
      class="button"
      :disabled="isDisabled">
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: "StyledButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '250'
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
  margin: 5px;
  color: #1A237E;
}

.button:hover {
  background-color: #444;
}

.button:disabled,
.red-btn:disabled{
  background-color: #999;
  cursor: not-allowed;
}

.green-btn:hover,
.logout-btn,
.logout-btn:hover{
  background-color: rgba(67, 154, 217);
}

.green-btn:disabled {
  background-color: rgba(67, 154, 217);
  cursor: not-allowed;
}

.green-btn,
.red-btn{
  background-color: rgba(67, 154, 217, 0.5);
}

.red-btn:hover {
  background-color: #c74545;
}

</style>
