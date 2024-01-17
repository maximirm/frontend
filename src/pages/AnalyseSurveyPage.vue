<template>
  <div class="analyze-survey-page">
    <h2>Analysiere Umfrage</h2>
    <!-- Button, um zu "Meine Umfragen" zurückzukehren -->
    <ButtonGroup :buttons="buttons"/>
    <div class="survey-list-box">
      <SurveyInfo
          v-for="(survey, index) in surveys"
          :key="index"
          :survey="survey"
          :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
          @surveySelected="selectSurvey"
      />
    </div>
    <!-- Hier können Sie die Umfrage-Analyse hinzufügen -->
  </div>
</template>

<script>
import axios from "axios";
import ButtonGroup from "@/components/ButtonGroup.vue";
import SurveyInfo from "@/components/SurveyInfo.vue";

export default {
  components: {
    SurveyInfo,
    ButtonGroup,
  },
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
    };
  },
  computed: {
    buttons() {
      return [
        { text: 'Meine Umfragen anzeigen', clickHandler: this.showMySurveys},
        { text: 'Zurück zur Editorseite', clickHandler: this.goToEditorPage}
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
      this.$router.push({ name: 'EditorPage' });
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

.survey-list-box {
  max-height: 600px;
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid #444;
}
</style>
