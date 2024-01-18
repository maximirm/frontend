<script>
export default {
  data() {
    return {
      selectedSurvey: null,
      questions: [],
    }
  },
  mounted() {
    this.selectedSurvey = this.$store.state.selectedSurvey;
  },
  methods: {},

};
</script>
<template>
  <div><p></p></div>
</template>

<style scoped>

</style>
