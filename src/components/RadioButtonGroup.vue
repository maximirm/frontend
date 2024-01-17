<!-- RadioGroup.vue -->
<template>
  <div class="radio-group">
    <label class="group-label">{{ groupTitle }}</label>
    <div v-for="option in options" :key="option.value" class="radio-wrapper">
      <label :for="option.id" class="radio-label">
        <input type="radio" :id="option.id" :checked="selectedOption === option.value" @change="handleChange(option.value)" />
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupTitle: {
      type: String,
      default: 'Radio-Button-Gruppe',
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
    handleChange(value) {
      this.$emit('update:selectedOption', value);
    },
  },
};
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.group-label {
  font-size: 16px;
  margin-bottom: 5px; /* Erhöhter Abstand zwischen dem Label und den Radio-Buttons */
}

.radio-wrapper {
  display: flex;
  align-items: center;
}

.radio-label {
  margin-left: 10px; /* Abstand zwischen dem Radio-Button und dem Label */
  display: flex;
  align-items: center;
}

input[type="radio"] {
  margin-right: 5px;
}

/* Füge hier weiteres Styling hinzu, um die Radio-Buttons nach deinen Vorstellungen zu gestalten */
</style>
