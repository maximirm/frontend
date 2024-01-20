<template>
  <div class="respondent-page">
    <StyledButton
        :onClickMethod="redirectToLandingPage"
        :label="'Zurück zur Startseite'"/>
    <SurveyCatalog
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectSurvey"/>
    <div v-if="selectedSurvey" class="button-container">
      <StyledButton
          :label="'Umfrage beantworten'"
          :onClickMethod="respondToSurvey"
          :isDisabled="selectedSurvey.questions.length === 0"
          :class="'respond-survey-btn'"/>
    </div>
  </div>
</template>

<script>
import StyledButton from "@/components/buttons/StyledButton.vue";
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import {fetchAllSurveys} from "@/api/surveyApi";

export default {
  name: "RespondentPage",
  components: {
    SurveyCatalog,
    StyledButton,
  },
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
      respondentIsAnonymous: true,
    };
  },
  created() {
    this.respondentIsAnonymous = this.$route.params.respondentIsAnonymous;
  },
  mounted() {
    this.displaySurveys();
  },
  methods: {
    selectSurvey(survey) {
      this.selectedSurvey = survey;
    },
    async displaySurveys() {
      try {
        this.surveys = await fetchAllSurveys();
        this.surveys = this.filterSurveysWithQuestions(this.surveys);
      } catch (error) {
        this.surveys = [];
      }
    },
    filterSurveysWithQuestions(surveys) {
      return surveys.filter(survey => survey.questions.length > 0);
    },
    redirectToLandingPage() {
      this.$router.push({name: 'LandingPage'});
    },
    respondToSurvey() {
      const selectedSurvey = this.selectedSurvey;
      this.$store.commit('setSelectedSurvey', selectedSurvey);
      this.$router.push({
        name: 'ResponsePage',
        params: {respondentIsAnonymous: this.respondentIsAnonymous},
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



.button-container {
  display: flex;
  gap: 10px;
}

</style>
