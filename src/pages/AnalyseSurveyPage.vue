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
      <SurveyList
          :pdf-columns="pdfColumns"
          :list-title="listTitle"
          :surveys="surveys"
          :selectedSurvey="selectedSurvey"
          @surveySelected="selectSurvey"/>
      <QuestionList
          :questions="questions"
          :selectedQuestion="selectedQuestion"
          @questionSelected="selectQuestion"/>

      <div class="fixed-panel">
        <AnalysePanel
            v-if="selectedSurvey"
            :analysis-responses="responseAnalysis"
            :analysis-responses-label="'Antworten'"
            :analysis-respondents="respondentsAnalysis"
            :analysis-respondents-label="'Respondents'"
            :analysis-complete="analysisComplete"/>
      </div>
    </div>

    <div class="button-container">
      <BaseButton
          :buttonText="'Umfrage löschen'"
          :clickHandler="deleteSelectedSurvey"
          :isDisabled="!selectedSurvey"
          class="delete-btn"/>
      <BaseButton
          :buttonText="'Frage analysieren'"
          :clickHandler="analyseQuestion"
          :isDisabled="!selectedQuestion
          || this.selectedQuestion.type === 1
          || this.selectedQuestion.responses.length === 0"
          class="show-questions-btn"/>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";
import AnalysePanel from "@/components/AnalysePanel.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import FeedbackMessage from "@/components/FeedbackMessage.vue";
import {deleteSurvey, fetchSurveysByCreatorId} from "@/api/surveyApi";
import {fetchAnalysedQuestion} from "@/api/analysisApi";
import SurveyList from "@/components/SurveyList.vue";
import QuestionList from "@/components/QuestionList.vue";

export default {
  components: {
    QuestionList,
    SurveyList,
    FeedbackMessage,
    LogoutButton,
    AnalysePanel,
    BaseButton,
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
      pdfColumns: [
        {header: "Titel", dataKey: "title", width: 40},
        {header: "Beschreibung", dataKey: "description", width: 30},
        {header: "Anzahl der Fragen", dataKey: "numberOfQuestions", width: 50}
      ],
      listTitle: "Umfragenliste"
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
            allSurveys.map(async (survey) =>{
              return {
                ...survey,
                numberOfQuestions: survey.questions.length
              }
            })
        )
        console.log(this.surveys)
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
