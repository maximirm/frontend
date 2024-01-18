<template>
  <div class="respondent-page">
    <ButtonGroup :buttons="buttons"/>

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
    </div>
    <div v-if="selectedSurvey" class="button-container">

      <BaseButton
          :buttonText="'Umfrage beantworten'"
          :clickHandler="respondToSurvey"
          :isDisabled="!selectedSurvey"
          class="respond-survey-btn"
      />
    </div>
  </div>
</template>

<script>
import SurveyInfo from "@/components/SurveyInfo.vue";
import axios from "axios";
import ButtonGroup from "@/components/ButtonGroup.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "RespondentPage",
  components: {BaseButton, ButtonGroup, SurveyInfo},
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
      message: '',
      isAnonymous: true,
    };
  },
  created(){
    this.isAnonymous = this.$route.params.isAnonymous;
  },

  mounted() {
    this.getAllSurveys()
  },
  computed: {
    buttons() {
      return [
        {text: 'Zurück zur Startseite', clickHandler: this.redirectToHomePage}
      ];
    },
  },
  methods: {
    selectSurvey(survey) {
      this.selectedSurvey = survey
    },
    async getAllSurveys() {
      try {
        const response = await axios.get(`http://127.0.0.1:8002/surveys/all/`);
        if (response.status === 200) {
          this.surveys = response.data
        }
      } catch (error) {
        this.surveys = [];
      }
    },
    redirectToHomePage() {
      this.$router.push({name: 'LandingPage'});
    },
    respondToSurvey() {
      this.$router.push({ name: 'ResponsePage', params: { surveyId: this.selectedSurvey.id, isAnonymous: this.isAnonymous}});
    }
  }
}
</script>


<style scoped>

.respondent-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #333;
  color: #fff;
}

.survey-list-box {
  max-height: 600px;
  width: 600px;
  overflow-y: auto;
  margin-top: 20px;
  scrollbar-width: thin; /* Breite der Scrollleiste festlegen */
  scrollbar-color: #555 #444; /* Farbe der Scrollleiste festlegen */
}

.survey-list-box::-webkit-scrollbar {
  width: 8px; /* Breite der Webkit-Scrollleiste festlegen */
}

.survey-list-box::-webkit-scrollbar-thumb {
  background-color: #555; /* Farbe des Scrollbalken-Daumens festlegen */
}

.survey-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777; /* Farbe des Scrollbalken-Daumens bei Hover festlegen */
}

.respond-survey-btn {
  background-color: #4CAF50;
}

.respond-survey-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.button-container {
  display: flex;
  gap: 10px; /* Abstand zwischen den Buttons anpassen, wie gewünscht */
}
</style>
