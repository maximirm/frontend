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
      <LogoutButton
          :label="'Zur Startseite'"/>
    </div>
  </div>
</template>

<script>
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import {fetchAllSurveys} from "@/scripts/api/surveyApi";
import LogoutButton from "@/components/general/buttons/LogoutButton.vue";

export default {
  name: "RespondentPage",
  components: {
    LogoutButton,
    SurveyCatalog,
    StyledButton,
  },
  data() {
    return {
      surveys: [],
      selectedSurvey: null,
    };
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
        let surveys = await fetchAllSurveys();
        surveys = this.filterSurveysWithQuestions(surveys);
        if (!this.$store.state.userId) {
          surveys = this.filterSurveysByVisibility(surveys)
        }
        this.surveys = surveys

      } catch (error) {
        this.surveys = [];
      }
    },
    filterSurveysWithQuestions(surveys) {
      return surveys.filter(survey => survey.questions.length > 0);
    },
    filterSurveysByVisibility(surveys) {
      return surveys.filter(survey => survey.is_public === true);
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
