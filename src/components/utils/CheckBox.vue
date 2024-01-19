<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-for="(option, index) in options" :key="index">
      <input
          type="checkbox"
          :id="option"
          :value="option"
          v-model="selectedOptions"
          @change="handleChange"
      />
      <label :for="option">{{ option }}</label>
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
