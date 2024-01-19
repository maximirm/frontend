<template>
  <div class="analyze-survey-page">
    <h2>Meine Umfragen</h2>
    <BaseButton
        :clickHandler="redirectToEditorPage"
        :button-text="'Zurück'"/>
    <LogoutButton/>
    <FeedbackMessage
        v-if="message"
        :message-class="'success'"
        :message="message"/>

    <div class="list-container">
      <div class="survey-list-box">
        <SurveyInfo
            v-for="(survey, index) in surveys"
            :key="index"
            :survey="survey"
            :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
            @surveySelected="selectSurvey"
        />
      </div>

      <div class="question-list-box">
        <QuestionInfo
            v-for="(question, index) in questions"
            :key="index"
            :question="question"
            :isSelected="selectedQuestion && selectedQuestion.id === question.id"
            @questionSelected="selectQuestion"
        />
      </div>

      <div class="fixed-panel">
        <AnalysePanel
            v-if="selectedSurvey"
            :analysis-responses="responseAnalysis"
            :analysis-responses-label="'Antworten'"
            :analysis-respondents="respondentsAnalysis"
            :analysis-respondents-label="'Respondents'"
            :analysis-complete="analysisComplete"
        />
      </div>
    </div>

    <div class="button-container">
      <BaseButton
          :buttonText="'Umfrage löschen'"
          :clickHandler="deleteSelectedSurvey"
          :isDisabled="!selectedSurvey"
          class="delete-btn"
      />
      <BaseButton
          :buttonText="'Frage analysieren'"
          :clickHandler="analyseQuestion"
          :isDisabled="!selectedQuestion
          || this.selectedQuestion.type === 1
          || this.selectedQuestion.responses.length === 0"
          class="show-questions-btn"
      />
    </div>
  </div>
</template>

<script>
import SurveyInfo from "@/components/SurveyInfo.vue";
import BaseButton from "@/components/BaseButton.vue";
import QuestionInfo from "@/components/QuestionInfo.vue";
import AnalysePanel from "@/components/AnalysePanel.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import FeedbackMessage from "@/components/FeedbackMessage.vue";
import {deleteSurvey, fetchSurveysByCreatorId} from "@/api/surveyApi";
import {fetchAnalysedQuestion} from "@/api/analysisApi";

export default {
  components: {
    FeedbackMessage,
    LogoutButton,
    AnalysePanel,
    QuestionInfo,
    BaseButton,
    SurveyInfo,
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
        this.surveys = await fetchSurveysByCreatorId(token, creatorId);
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
      this.selectedSurvey = survey;
      this.questions = this.selectedSurvey.questions;
    },

    async analyseQuestion() {
      if (!this.selectedQuestion) {
        return;
      }
      try {
        const token = this.$store.state.userToken;

        const response = await fetchAnalysedQuestion(token, this.selectedQuestion.id);

        this.responseAnalysis = response.analysis_responses;
        this.respondentsAnalysis = response.analysis_respondents;
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

.survey-list-box,
.question-list-box {
  width: 500px;
  overflow-y: auto;
  height: 600px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
}

.survey-list-box::-webkit-scrollbar,
.question-list-box::-webkit-scrollbar {
  width: 8px;
}

.survey-list-box::-webkit-scrollbar-thumb,
.question-list-box::-webkit-scrollbar-thumb {
  background-color: #555;
}

.survey-list-box::-webkit-scrollbar-thumb:hover,
.question-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777;
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

.delete-btn {
  background-color: #d32f2f;
}

.show-questions-btn {
  background-color: #4CAF50;
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.button-container {
  display: flex;
  gap: 10px;
}
</style>
