<template>
  <div class="survey-list-box">
    <SurveyInfo
        v-for="(survey, index) in surveys"
        :key="index"
        :survey="survey"
        :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
        @surveySelected="selectSurvey"
    />
  </div>
</template>

<script>
import SurveyInfo from "@/components/SurveyInfo.vue";

export default {
  components: {
    SurveyInfo,
  },
  props: {
    surveys: Array, // Die Liste der Umfragen, die von der übergeordneten Komponente übergeben wird
    selectedSurvey: Object, // Das ausgewählte Survey-Objekt von der übergeordneten Komponente
  },
  methods: {
    selectSurvey(survey) {
      // Die Methode zum Auswählen einer Umfrage wird von der übergeordneten Komponente aufgerufen
      this.$emit("surveySelected", survey);
    },
  },
};
</script>
