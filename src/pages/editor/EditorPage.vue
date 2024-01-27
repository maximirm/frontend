<template>
  <BoxWrapper
      height="400px"
      width="400px">
    <div class="editor-page">
      <h2>Editor</h2>

      <div class="button-container">
        <StyledButton
            :on-click-method="redirectToAnalyseSurveyPage"
            label="Meine Umfragen"
            class="green-btn"/>
        <StyledButton
            :on-click-method="redirectToCreateSurveyPage"
            label="Umfrage Erstellen"
            class="green-btn"/>
      </div>
    </div>
  </BoxWrapper>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";

export default {
  components: {
    BoxWrapper,
    StyledButton,

  },
  methods: {
    redirectToCreateSurveyPage() {
      this.$router.push({name: 'CreateSurveyPage'});
    },
    redirectToAnalyseSurveyPage() {
      this.$router.push({name: 'AnalyseSurveyPage'});
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
  height: 80vh;
  overflow: hidden;

}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

</style>
