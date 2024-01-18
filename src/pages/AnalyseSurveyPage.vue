<template>
  <div class="analyze-survey-page">
    <h2>Meine Umfragen</h2>
    <!-- Button, um zu "Meine Umfragen" zurückzukehren -->
    <ButtonGroup :buttons="buttons"/>
    <div v-if="message" class="success-message">{{ message }}</div>
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
        <!-- Fixiertes AnalysePanel -->
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
import axios from "axios";
import ButtonGroup from "@/components/ButtonGroup.vue";
import SurveyInfo from "@/components/SurveyInfo.vue";
import BaseButton from "@/components/BaseButton.vue";
import QuestionInfo from "@/components/QuestionInfo.vue";
import AnalysePanel from "@/components/AnalysePanel.vue";

export default {
  components: {
    AnalysePanel,
    QuestionInfo,
    BaseButton,
    SurveyInfo,
    ButtonGroup,
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
    buttons() {
      return [
        {text: 'Meine Umfragen anzeigen', clickHandler: this.showMySurveys},
        {text: 'Zurück zur Editorseite', clickHandler: this.goToEditorPage}
      ];
    },
  },
  methods: {
    async showMySurveys() {
      try {
        const creatorId = this.$store.state.userId;
        this.surveys = await this.getSurveysByCreatorId(creatorId);
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
      this.questions = this.selectedSurvey.questions

    },
    goToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },
    async getSurveysByCreatorId(creatorId) {
      try {
        const token = this.$store.state.userToken;
        const response = await axios.get(`http://127.0.0.1:8002/surveys/by_creator/${creatorId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        console.error(`Fehler beim Abrufen der Umfragen für Benutzer mit ID ${creatorId}:`, error);
        return [];
      }
    },
    async analyseQuestion() {

      if (!this.selectedQuestion){
        return;
      }

      try {
        const token = this.$store.state.userToken;
        const response = await axios.get(`http://127.0.0.1:8002/analyze/question/${this.selectedQuestion.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          this.responseAnalysis = response.data.analysis_responses
          this.respondentsAnalysis = response.data.analysis_respondents
          this.analysisComplete = true;
        }
      } catch (error) {
        this.analysisComplete = false;

        console.error(error);
      }

    },

    async deleteSelectedSurvey() {
      if (!this.selectedSurvey) return;

      try {
        const token = this.$store.state.userToken;
        const response = await axios.delete(`http://127.0.0.1:8002/surveys/${this.selectedSurvey.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.selectedSurvey = null;
          await this.showMySurveys();
          this.message = "Umfrage erfolgreich gelöscht"
          setTimeout(() => this.message = '', 3000);
        }
      } catch (error) {
        this.message = "Fehler beim Löschen der Umfrage";
      }
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

.success-message {
  color: green;
  margin-top: 10px;
}

.list-container {
  display: flex;
  gap: 10px;
}

.survey-list-box,
.question-list-box {
  width: 500px; /* Setzen Sie die Breite nach Bedarf */
  overflow-y: auto;
  height: 600px; /* Setzen Sie die maximale Höhe nach Bedarf */
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
  /* Fixieren Sie das AnalysePanel auf der rechten Seite */
  position: sticky;
  top: 0;
  right: 0;
  width: 500px; /* Setzen Sie die Breite nach Bedarf */
  height: 600px; /* Setzen Sie die maximale Höhe nach Bedarf */
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
