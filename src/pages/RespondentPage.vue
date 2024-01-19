<template>
  <div class="respondent-page">
    <BaseButton
        :click-handler="redirectToHomePage"
        :button-text="'Zurück zur Startseite'"/>
    <SurveyList
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectSurvey"/>

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
import BaseButton from "@/components/BaseButton.vue";
import {fetchAllSurveys} from "@/api/surveyApi";
import SurveyList from "@/components/SurveyList.vue";

export default {
  name: "RespondentPage",
  components: {SurveyList, BaseButton},
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
