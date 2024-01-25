
<template>
  <v-responsive
      class="mx-auto"
      width="250">
    <v-text-field
        v-model="localModel"
        :label="label"
        hide-details="auto"
        :type="inputType"
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
    model: {
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
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


