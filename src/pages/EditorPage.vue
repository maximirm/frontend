<template>
  <div class="editor-page">
    <h2>Editor</h2>


    <ButtonGroup :buttons="buttons" />


  </div>
</template>

<script>
import ButtonGroup from "@/components/ButtonGroup.vue";

export default {
  components: {ButtonGroup},
  computed: {
    buttons() {
      return [
        {text: 'Survey Erstellen', clickHandler: this.goToCreateSurveyPage},
        {text: 'Survey Analyse', clickHandler: this.goToAnalyseSurveyPage},
        {text: 'Zurück zur Startseite', clickHandler: this.redirectToHomePage},
      ];
    },
  },
  methods: {
    redirectToHomePage() {
      this.$router.push({ name: 'LandingPage' });
    },

    goToCreateSurveyPage() {
      this.$router.push({ name: 'CreateSurveyPage' });
    },

    goToAnalyseSurveyPage() {
      this.$router.push({ name: 'AnalyseSurveyPage' });
    },
  },
};
</script>

<style scoped>
.editor-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

</style>
