<template>
  <v-btn
      variant="tonal"
      size="large"
      width="250"
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
}
.button:hover {
  background-color: #444;

}

.button:disabled {
  background-color: #999;
  cursor: not-allowed;
}


.green-btn:hover {
  background-color: #508a53;
}

.green-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.green-btn {
  background-color: rgba(80, 138, 83, 0.5);

}

.red-btn {
  background-color: rgba(199, 69, 69, 0.5);
}

.red-btn:hover {
  background-color: #c74545;

}

.red-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

</style>
