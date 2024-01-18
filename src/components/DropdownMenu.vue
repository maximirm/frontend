<template>
  <div class="dropdown">
    <label class="dropdown-label">{{ title }}</label>
    <select :value="selectedOption" @input="handleChange">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>

    </select>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Dropdown',
    },
    options: {
      type: Array,
      required: true,
    },
    selectedOption: {
      required: true,
    },
  },
  methods: {
    handleChange(event) {
      console.log(this.selectedOption)
      this.$emit('update:selectedOption', event.target.value);
    },
  },
};
</script>

<style scoped>
.dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 200px;
}

.dropdown-label {
  font-size: 16px;
  margin-bottom: 5px;
}

select {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
