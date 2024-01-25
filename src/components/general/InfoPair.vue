<template>
  <div class="d-flex align-center flex-column">


    <v-card width="200">
      <v-card-item>
        <v-card-title>{{ label }}</v-card-title>

      </v-card-item>

      <v-card-text>
        {{ value  }}
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "InfoPair",
  props: {
    label: null,
    value: null,
  },
};
</script>

