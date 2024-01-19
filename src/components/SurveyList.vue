<template>
  <div class="survey-list-container">
    <div class="survey-list-box">
      <SurveyInfo
          v-for="(survey, index) in surveys"
          :key="index"
          :survey="survey"
          :isSelected="selectedSurvey && selectedSurvey.id === survey.id"
          @surveySelected="selectSurvey(survey)"/>
    </div>
    <div class="file-export-container">
      <FileExport
          :pdfData="mappedDataForExport"
          :csvData="mappedDataForExport"
          :pdfColumns="pdfColumns"
          :fileName="listTitle"/>
    </div>
  </div>
</template>

<script>
import SurveyInfo from "@/components/SurveyInfo.vue";
import FileExport from "@/components/FileExport.vue";

export default {
  components: {
    FileExport,
    SurveyInfo,
  },
  props: {
    surveys: Array,
    selectedSurvey: Object,
    pdfColumns: {
      type: Array,
      required: true
    },
    listTitle: {
      type: String,
      required: true
    },
  },
  computed: {
    mappedDataForExport() {
      const data = [];
      this.surveys.forEach((survey) => {
        const surveyData = {
          title: survey.title,
          description: survey.description,
          numberOfQuestions: survey.numberOfQuestions,
        };
        data.push(surveyData);
      });
      return data;
    },
  },
  methods: {
    selectSurvey(survey) {
      this.$emit("surveySelected", survey);
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.survey-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.survey-list-box {
  width: 500px;
  overflow-y: auto;
  height: 600px;
  scrollbar-width: thin;
  scrollbar-color: #555 #444;
  flex-grow: 1;
}

.file-export-container {
  margin-top: 20px;
  flex-grow: 0;
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
</style>
