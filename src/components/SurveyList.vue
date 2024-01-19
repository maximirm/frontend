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
<style scoped>

h2 {
  margin-bottom: 20px;
}

.survey-list-box{
  width: 500px;
  overflow-y: auto;
  height: 600px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
}

.survey-list-box::-webkit-scrollbar{
  width: 8px;
}

.survey-list-box::-webkit-scrollbar-thumb{
  background-color: #555;
}

.survey-list-box::-webkit-scrollbar-thumb:hover{
  background-color: #777;
}

</style>
