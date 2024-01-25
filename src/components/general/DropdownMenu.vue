<template>
  <div class="text-center">
    <v-menu
        open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            ariant="tonal"
            color="rgba(87, 194, 221, 0.5)"
            style="color: #F0F8FF;"
            size="large"
            width="250"
            class="button"
        >
          {{ selectedOption ? selectedOption : title }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(option, index) in options"
            :key="index"
            @click="handleChange(option)"

        >
          <v-list-item-title> {{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
    handleChange(option) {
      console.log(option)
      this.$emit('update:selectedOption', option);
    },
  },
};
</script>

<style scoped>


select {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
}


.text-center {
  margin: 5px;
}
</style>
