<template>
  <div class="analyze-survey-page">
    <div class="list-container">

      <SurveyCatalogWithExport
          :surveys="surveys"
          :selectedSurvey="selectedSurvey"
          :selectFunction="selectSurvey"/>
      <QuestionCatalog
          v-if="selectedSurvey && selectedSurvey.questions.length > 0"
          :questions="questions"
          :selectedQuestion="selectedQuestion"
          @questionSelected="selectQuestion"/>
      <div class="fixed-panel">
        <AnalysePanel
            v-if="analysisComplete"
            :barChartData="responseAnalysis"
            :barChartLabel="'Antworten'"
            :bar-chart-is-disabled="isFreeTextQuestion"
            :pieChartData="respondentsAnalysis"
            :pieChartLabel="'Befragte'"
            :analysisIsComplete="analysisComplete"/>

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
          :label="'Diagramme anzeigen'"
          :onClickMethod="analyseQuestion"
          :isDisabled="!selectedQuestion || selectedQuestion.responses.length === 0"
          :class="'green-btn'"/>
    </div>
    <StyledButton
        :onClickMethod="redirectToEditorPage"
        :label="'Zurück'"
        :class="'red-btn'"/>
    <LogoutButton/>
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
import QuestionCatalog from "@/components/catalogs/QuestionCatalog.vue";

export default {
  components: {
    QuestionCatalog,
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
  computed: {
    isFreeTextQuestion() {
      return this.selectedQuestion === null || this.selectedQuestion.type === 1;
    },
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
    selectSurvey(survey) {
      this.analysisComplete= false;
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

  overflow-y: auto;
  z-index: 1;
}

.button-container {
  display: flex;
}

</style>
