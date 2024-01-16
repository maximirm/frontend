<template>
  <div class="editor-page">
    <h2>Editor</h2>

    <button @click="goToHomePage" class="btn">Zurück zur Startseite</button>
    <button @click="goToCreateSurveyPage" class="btn">Create Survey</button>
    <button @click="goToAnalyseSurveyPage" class="btn">Analyse Survey</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToHomePage() {
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

.btn {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #555;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
