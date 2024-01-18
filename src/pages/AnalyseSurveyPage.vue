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
    </div>
    <div v-if="selectedSurvey" class="button-container">
      <BaseButton
          :buttonText="'Umfrage löschen'"
          :clickHandler="deleteSelectedSurvey"
          :isDisabled="!selectedSurvey"
          class="delete-btn"
      />
      <BaseButton
          :buttonText="'Frage analysieren'"
          :clickHandler="analyseQuestion"
          :isDisabled="!selectedQuestion"
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

export default {
  components: {
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
    analyseQuestion() {
      if (!this.selectedSurvey) return;


      // Führen Sie hier die gewünschten Aktionen aus, um die Fragen für die ausgewählte Umfrage anzuzeigen.
      // Zum Beispiel, Sie könnten die Fragen in einer neuen Ansicht anzeigen oder eine Modaldialogbox öffnen.
      // Hier sollte Ihre Logik für die Anzeige der Fragen stehen.
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

.survey-list-box,
.question-list-box {
  max-height: 600px;
  width: 600px;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: thin; /* Breite der Scrollleiste festlegen */
  scrollbar-color: #555 #444; /* Farbe der Scrollleiste festlegen */
}

.survey-list-box::-webkit-scrollbar,
.question-list-box::-webkit-scrollbar {
  width: 8px; /* Breite der Webkit-Scrollleiste festlegen */
}

.survey-list-box::-webkit-scrollbar-thumb,
.question-list-box::-webkit-scrollbar-thumb {
  background-color: #555; /* Farbe des Scrollbalken-Daumens festlegen */
}

.survey-list-box::-webkit-scrollbar-thumb:hover,
.question-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777; /* Farbe des Scrollbalken-Daumens bei Hover festlegen */
}

.delete-btn {
  background-color: #d32f2f; /* Lebendige rote Farbe für Löschen-Button */
}
.show-questions-btn{
  background-color: #4CAF50;
}

.delete-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
.button-container {
  display: flex;
  gap: 10px; /* Abstand zwischen den Buttons anpassen, wie gewünscht */
}
.list-container {
  display: flex;
  gap: 10px; /* Abstand zwischen den Buttons anpassen, wie gewünscht */
}
</style>
