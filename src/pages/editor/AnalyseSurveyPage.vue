<template>
  <BoxWrapper
      height="800px"
      width="500px">
    <div class="analyse_survey-page">
      <div class="analyse_survey-form">
        <h2>Umfragen</h2>
      </div>

      <SurveyCatalogWithExport
          :surveys="surveys"
          :selectedSurvey="selectedSurvey"
          :selectFunction="selectSurvey"/>
      <div class="button-container">

        <FeedbackMessageWrapper>
          <FeedbackMessage
              v-if="message"
              :messageType="'success'"
              :message="message"/>
        </FeedbackMessageWrapper>
        <StyledButton
            :label="'Umfrage löschen'"
            :onClickMethod="deleteSelectedSurvey"
            :isDisabled="!selectedSurvey"
            :class="'red-btn'"/>
        <StyledButton
            :label="'Fragen anzeigen'"
            :onClickMethod="showQuestions"
            :isDisabled="!selectedSurvey || selectedSurvey.questions.length === 0"
            :class="'green-btn'"/>
      </div>
    </div>
  </BoxWrapper>
</template>


<script>
import FeedbackMessage from "@/components/generic/FeedbackMessage.vue";
import {deleteSurvey, fetchSurveysByCreatorId} from "@/scripts/api/surveyApi";
import StyledButton from "@/components/buttons/StyledButton.vue";
import FeedbackMessageWrapper from "@/components/generic/FeedbackMessageWrapper.vue";
import SurveyCatalogWithExport from "@/components/catalogs/SurveyCatalogWithExport.vue";
import BoxWrapper from "@/components/generic/BoxWrapper.vue";

export default {
  components: {
    BoxWrapper,
    SurveyCatalogWithExport,
    FeedbackMessageWrapper,
    StyledButton,
    FeedbackMessage,
  },
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
      message: '',
    };
  },
  mounted() {
    this.displaySurveys();
  },
  methods: {
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    async displaySurveys() {
      try {
        const creatorId = this.$store.state.userId;
        const token = this.$store.state.userToken;
        const allSurveys = await fetchSurveysByCreatorId(token, creatorId);
        this.surveys = await Promise.all(
            allSurveys.map(async (survey) => {
              return {
                ...survey,
                numberOfQuestions: survey.questions.length,
              }
            })
        )
      } catch (error) {
        this.surveys = [];
        console.error('Fehler beim Abrufen der Umfragen:', error);
      }
    },

    selectSurvey(survey) {
      this.analysisComplete = false;
      this.selectedSurvey = survey;
      this.questions = this.selectedSurvey.questions;
    },

    showQuestions() {
      this.$store.commit('setSelectedSurvey', this.selectedSurvey);
      this.$router.push({name: 'AnalyseQuestionsPage'});
    },
    async deleteSelectedSurvey() {
      if (!this.selectedSurvey) return;

      try {
        const token = this.$store.state.userToken;
        await deleteSurvey(token, this.selectedSurvey.id);
        await this.displaySurveys();
        this.selectedSurvey = null;
        this.message = "Umfrage erfolgreich gelöscht";
        setTimeout(() => this.message = '', 3000);
      } catch (error) {
        this.message = "Fehler beim Löschen der Umfrage";
      }
    },
    redirectToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },
  },
};
</script>

<style scoped>

.analyse_survey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  overflow: hidden;

}

.analyse_survey-form {
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

</style>

