<template>
  <div class="respondent-page">

    <SurveyCatalog
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectSurvey"/>
    <StyledButton
        :label="'Umfrage beantworten'"
        :onClickMethod="respondToSurvey"
        :isDisabled="!selectedSurvey || selectedSurvey.questions.length === 0"
        :class="'green-btn'"/>
    <div class="button-container">

      <StyledButton
          :onClickMethod="redirectToLandingPage"
          :label="'Zur Startseite'"
          :class="'red-btn'"/>
    </div>
  </div>
</template>

<script>
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import {fetchAllSurveys} from "@/scripts/api/surveyApi";

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

}


.button-container {
  display: flex;

  gap: 10px;


}

</style>
