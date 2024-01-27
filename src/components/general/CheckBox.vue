<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-for="(option, index) in options"
         :key="index">
      <div class="custom-checkbox">
        <input
            type="checkbox"
            :id="option"
            :value="option"
            v-model="selectedOptions"
            @change="handleChange"
            class="checkbox-input"/>
        <label
            class="checkbox-label"
            :for="option">
          {{ option }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedOptions: [],
    };
  },
  methods: {
    handleChange() {
      this.$emit('update:selectedOptions', this.selectedOptions);
    },
  },
};
</script>
<style scoped>

.custom-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.checkbox-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #1A237E;
  border-radius: 3px;
  outline: none;
  margin-right: 8px;
  cursor: pointer;
}

.checkbox-input:checked {
  background-color: #1A237E;
}

.checkbox-label {
  cursor: pointer;
}

</style>
