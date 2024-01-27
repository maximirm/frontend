<template>
  <BoxWrapper
      height="600px"
      width="500px">
    <div class="respondent-page">
      <div class="respondent-form">
        <h2>Umfragen</h2>
      </div>

      <SurveyCatalog
          :surveys="surveys"
          :selectedSurvey="selectedSurvey"
          @surveySelected="selectSurvey"/>

      <div class="button-container">
        <StyledButton
            :label="'Umfrage beantworten'"
            :onClickMethod="respondToSurvey"
            :isDisabled="!selectedSurvey || selectedSurvey.questions.length === 0"
            :class="'green-btn'"/>
      </div>
    </div>
  </BoxWrapper>
</template>

<script>
import StyledButton from "@/components/general/buttons/StyledButton.vue";
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import {fetchAllSurveys} from "@/scripts/api/surveyApi";
import BoxWrapper from "@/components/general/BoxWrapper.vue";

export default {
  name: "RespondentPage",
  components: {
    BoxWrapper,
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
      this.$router.push({name: 'ResponsePage',});
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
  height: 80vh;
  overflow: hidden;
}

.respondent-form {
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

</style>
