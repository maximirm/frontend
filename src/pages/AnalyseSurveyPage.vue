<template>
  <div class="analyze-survey-page">
    <h2>Meine Umfragen</h2>
    <!-- Button, um zu "Meine Umfragen" zurückzukehren -->
    <ButtonGroup :buttons="buttons"/>
    <div v-if="message" class="success-message">{{ message }}</div>
    <div class="survey-list-box">
      <SurveyInfo
          v-for="(survey, index) in surveys"
          :key="index"
          :survey="survey"
          :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
          @surveySelected="selectSurvey"
      />
    </div>
    <div v-if="selectedSurvey" class="button-container">
      <BaseButton
          :buttonText="'Umfrage löschen'"
          :clickHandler="deleteSelectedSurvey"
          :isDisabled="!selectedSurvey"
          class="delete-btn"
      />
      <BaseButton
          :buttonText="'Fragen anzeigen'"
          :clickHandler="showSurveyQuestions"
          :isDisabled="!selectedSurvey"
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

export default {
  components: {
    BaseButton,
    SurveyInfo,
    ButtonGroup,
  },
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
      message: ''
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
        const creatorId = localStorage.getItem("user-id");// Setzen Sie die Creator-ID
        this.surveys = await this.getSurveysByCreatorId(creatorId);
        console.log(this.surveys[0])
      } catch (error) {
        console.error('Fehler beim Abrufen der Umfragen:', error);
      }
    },
    selectSurvey(survey) {
      this.selectedSurvey = survey;
    },
    goToEditorPage() {
      this.$router.push({name: 'EditorPage'});
    },
    async getSurveysByCreatorId(creatorId) {
      try {
        const token = localStorage.getItem('token');
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
    showSurveyQuestions() {
      if (!this.selectedSurvey) return;

      // Führen Sie hier die gewünschten Aktionen aus, um die Fragen für die ausgewählte Umfrage anzuzeigen.
      // Zum Beispiel, Sie könnten die Fragen in einer neuen Ansicht anzeigen oder eine Modaldialogbox öffnen.
      // Hier sollte Ihre Logik für die Anzeige der Fragen stehen.
    },
    async deleteSelectedSurvey() {
      if (!this.selectedSurvey) return;

      try {
        const token = localStorage.getItem('token');
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

.survey-list-box {
  max-height: 600px;
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid #444;
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
</style>
