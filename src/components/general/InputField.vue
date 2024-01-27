<template>
  <v-responsive
      class="mx-auto"
      width="250">
    <v-text-field
        v-model="response"
        :label="label"
        hide-details="auto"
        :type="inputType"
        @update:modelValue="updateResponse"
    ></v-text-field>
  </v-responsive>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      response: '',
    };
  },
  methods: {
    updateResponse(newVal) {
      this.response = newVal
      this.$emit('update:response', this.response);
    },
  },
};
</script>
