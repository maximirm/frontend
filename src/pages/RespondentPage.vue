<template>
  <div class="respondent-page">
    <BaseButton
        :click-handler="redirectToHomePage"
        :button-text="'Zurück zur Startseite'"/>

    <div class="survey-list-box">
      <SurveyInfo
          v-for="(survey, index) in surveys"
          :key="index"
          :survey="survey"
          :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
          @surveySelected="selectSurvey"/>
    </div>

    <div v-if="selectedSurvey" class="button-container">
      <BaseButton
          :buttonText="'Umfrage beantworten'"
          :clickHandler="respondToSurvey"
          :isDisabled="!selectedSurvey || selectedSurvey.questions.length === 0"
          class="respond-survey-btn"/>
    </div>
  </div>
</template>

<script>
import SurveyInfo from "@/components/SurveyInfo.vue";
import BaseButton from "@/components/BaseButton.vue";
import {fetchAllSurveys} from "@/api/surveyApi";

export default {
  name: "RespondentPage",
  components: {BaseButton, SurveyInfo},
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
      message: '',
      isAnonymous: true,
    };
  },
  created() {
    this.isAnonymous = this.$route.params.isAnonymous;
  },
  mounted() {
    this.displaySurveys()
  },
  methods: {
    selectSurvey(survey) {
      this.selectedSurvey = survey
    },
    async displaySurveys() {
      try {
        this.surveys = await fetchAllSurveys();
        this.surveys = this.filterSurveysWithNoQuestions(this.surveys)
      } catch (error) {
        this.surveys = [];
      }
    },
    filterSurveysWithNoQuestions(surveys) {
      return surveys.filter(survey => survey.questions.length > 0);
    },
    redirectToHomePage() {
      this.$router.push({name: 'LandingPage'});
    },
    respondToSurvey() {
      const selectedSurvey = this.selectedSurvey;
      this.$store.commit('setSelectedSurvey', selectedSurvey);
      this.$router.push({
        name: 'ResponsePage',
        params: {isAnonymous: this.isAnonymous},
      });
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
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
}

.survey-list-box::-webkit-scrollbar {
  width: 8px;
}

.survey-list-box::-webkit-scrollbar-thumb {
  background-color: #555;
}

.survey-list-box::-webkit-scrollbar-thumb:hover {
  background-color: #777;
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
  gap: 10px;
}
</style>
