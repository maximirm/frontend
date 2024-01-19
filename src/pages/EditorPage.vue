<template>
  <div class="editor-page">
    <h2>Editor</h2>
    <ButtonGroup :buttons="buttons" />
    <LogoutButton/>
  </div>
</template>

<script>
import ButtonGroup from "@/components/ButtonGroup.vue";
import LogoutButton from "@/components/LogoutButton.vue";

export default {
  components: {LogoutButton, ButtonGroup},
  computed: {
    buttons() {
      return [
        {text: 'Meine Umfragen', clickHandler: this.goToAnalyseSurveyPage},
        {text: 'Umfrage Erstellen', clickHandler: this.goToCreateSurveyPage},
      ];
    },
  },
  methods: {
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
