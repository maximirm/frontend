<template>
  <FileExportContainer
      :exportData="mappedSurveyDataForExport"
      :label="label"
      :pdfColumnDefinition="pdfColumnDefinition">
    <SurveyCatalog
        :surveys="surveys"
        :selectedSurvey="selectedSurvey"
        @surveySelected="selectFunction"/>
  </FileExportContainer>
</template>

<script>
import SurveyCatalog from "@/components/catalogs/SurveyCatalog.vue";
import FileExportContainer from "@/components/general/export/FileExportContainer.vue";

export default {
  components: {
    FileExportContainer,
    SurveyCatalog,
  },
  props: {
    selectFunction: {
      type: Function,
      required: true,
    },
    selectedSurvey: {
      type: Object,
      required: true,
    },
    surveys: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      label: "Umfrageliste",
      pdfColumnDefinition: [
        {header: "Titel", dataKey: "title", width: 40},
        {header: "Beschreibung", dataKey: "description", width: 30},
        {header: "Anzahl der Fragen", dataKey: "numberOfQuestions", width: 50}
      ],
    }
  },
  computed: {
    mappedSurveyDataForExport() {
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
  }
}
</script>
