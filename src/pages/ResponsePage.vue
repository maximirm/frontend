<script>
export default {
  data(){
    return{
      surveyId: null,
    }
  },
  created() {
    this.surveyId = this.$route.params.surveyId;
  },
};
</script>
<template>
<div><p></p></div>
</template>

<style scoped>

</style>
