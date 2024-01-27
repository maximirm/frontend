<template>
  <v-container fluid>
    <v-select
        style="width: 250px;"
        v-model="selectedOption"
        :items="options"
        :label="label"
        @update:modelValue="updateSelectedOption"/>
  </v-container>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Dropdown',
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: null,
    }
  },
  methods: {
    updateSelectedOption(newVal){
      this.selectedOption = newVal;
      this.$emit('update:selectedOption', this.selectedOption);
    },

  },
};
</script>
