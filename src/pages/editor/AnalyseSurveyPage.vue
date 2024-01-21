<template>
  <div class="analyze-survey-page">
    <h2>Meine Umfragen</h2>
    <StyledButton
        :onClickMethod="redirectToEditorPage"
        :label="'Zurück'"/>
    <LogoutButton/>

    <div class="list-container">
      <SurveyCatalogWithExport
          :surveys="surveys"
          :selectedSurvey="selectedSurvey"
          :selectFunction="selectSurvey"/>
      <QuestionCatalogWithExport
          :questions="questions"
          :selectedQuestion="selectedQuestion"
          :selectFunction="selectQuestion"/>
      <div class="fixed-panel">
        <AnalysePanel
            v-if="selectedSurvey"
            :bar-chart-data="responseAnalysis"
            :bar-chart-label="'Antworten'"
            :pie-chart-data="respondentsAnalysis"
            :pie-chart-label="'Respondents'"
            :analysis-is-complete="analysisComplete"/>
      </div>
    </div>
    <FeedbackMessage
        v-if="message"
        :messageType="'success'"
        :message="message"/>

    <div class="button-container">
      <StyledButton
          :label="'Umfrage löschen'"
          :onClickMethod="deleteSelectedSurvey"
          :isDisabled="!selectedSurvey"
          :class="'red-btn'"/>
      <StyledButton
          :label="'Frage analysieren'"
          :onClickMethod="analyseQuestion"
          :isDisabled="!selectedQuestion
          || this.selectedQuestion.type === 1
          || this.selectedQuestion.responses.length === 0"
          :class="'green-btn'"/>
    </div>
  </div>
</template>

<script>
import AnalysePanel from "@/components/general/analysis/AnalysisPanel.vue";
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";
import FeedbackMessage from "@/components/general/FeedbackMessage.vue";
import {deleteSurvey, fetchSurveysByCreatorId} from "@/scripts/api/surveyApi";
import {fetchAnalysedQuestion} from "@/scripts/api/analysisApi";
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import SurveyCatalogWithExport from "@/components/catalogs/SurveyCatalogWithExport.vue";
import QuestionCatalogWithExport from "@/components/catalogs/QuestionCatalogWithExport.vue";

export default {
  components: {
    QuestionCatalogWithExport,
    SurveyCatalogWithExport,
    StyledButton,
    FeedbackMessage,
    LogoutButton,
    AnalysePanel,
  },
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
      message: '',
      questions: [],
      selectedQuestion: null,
      analysisComplete: false,
      responseAnalysis: [],
      respondentsAnalysis: [],
    };
  },
  mounted() {
    this.displaySurveys();
  },
  methods: {
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
        console.log(this.surveys);
      } catch (error) {
        console.error('Fehler beim Abrufen der Umfragen:', error);
      }
    },
    selectQuestion(question) {
      this.responseAnalysis = [];
      this.respondentsAnalysis = [];
      this.analysisComplete = false;
      this.selectedQuestion = question;
    },
    async selectSurvey(survey) {
      this.selectedSurvey = survey;
      this.questions = this.selectedSurvey.questions;

    },

    async analyseQuestion() {
      if (!this.selectedQuestion) {
        return;
      }
      try {
        const token = this.$store.state.userToken;

        const analyzedQuestionResponse = await fetchAnalysedQuestion(token, this.selectedQuestion.id);

        this.responseAnalysis = analyzedQuestionResponse.analysis_responses;
        this.respondentsAnalysis = analyzedQuestionResponse.analysis_respondents;
        this.analysisComplete = true;
      } catch (error) {
        this.analysisComplete = false;
      }
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

.analyze-survey-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

h2 {
  margin-bottom: 20px;
}


.list-container {
  display: flex;
  gap: 10px;
}


.fixed-panel {
  position: sticky;
  top: 0;
  right: 0;
  width: 500px;
  height: 600px;
  overflow-y: auto;
  background-color: #333;

  z-index: 1;
}

.button-container {
  display: flex;
  gap: 10px;
}

</style>
