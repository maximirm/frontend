<template>
  <div class="input-label-container">
    <label
        :for="inputId">
      {{ label }}
    </label>

    <input
        v-model="localModel"
        :type="inputType"
        :id="inputId"/>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    model: {
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localModel: this.model,
    };
  },
  watch: {
    localModel(newVal) {
      this.$emit('update:model', newVal);
    },
    model: {
      handler(newVal) {
        this.localModel = newVal;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

.input-label-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 10px;
}

input {
  padding: 8px;
  width: 180px;
}

</style>
